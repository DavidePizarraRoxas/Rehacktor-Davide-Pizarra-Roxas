import { useEffect, useRef, useState } from "react";
import { Card, CardHeader, CardBody, Divider, ScrollShadow } from "@nextui-org/react";
import supabase from "../../../supabase/client";
import ProgressBar from "../Progress/ProgressBar";
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'


export default function RealtimeChat({ game }) {

      const [messages, setMessages] = useState([]);
      const [loadingInitial, setLoadingInitial] = useState(false);
      const [error, setError] = useState("");
      const messageRef = useRef(null);
      dayjs.extend(relativeTime);


      function scrollSmoothToBottom() {
            if (!messageRef.current) return; {

                  messageRef.current.scrollTop = messageRef.current.scrollHeight;
            }

      };


      const getInitialMessages = async () => {
            setLoadingInitial(true)
            if (messages.length) return;

            const { data, error } = await supabase
                  .from("Messages")
                  .select()
                  .eq('game_id', game.id)
            setLoadingInitial(false);
            if (error) {
                  setError(error.message);
                  return;
            }
            setLoadingInitial(false);
            setMessages(data);
            // scrollToBottom(); // not sure why this stopped working, meanwhile using useEffect that's listening to messages and isInitialLoad state.
      };

      useEffect(() => {
            getInitialMessages();
            const channel = supabase
                  .channel('Messages')
                  .on(
                        'postgres_changes',
                        {
                              event: '*',
                              schema: 'public',
                              table: 'Messages'
                        },
                        () => getInitialMessages()
                  )
                  .subscribe()
            return () => {
                  if (channel) {
                        supabase.removeChannel(channel);
                  }
                  channel.unsubscribe();
            };
      }, []);

      useEffect(() => {
            scrollSmoothToBottom();
      }, [messages]);

      return (
            <>
                  {error && <article>{error}</article>}
                  <Card className=" w-full h-[350px] p-1"  >
                        <CardHeader>
                              <p className="text-xl font-bold">Live Chat </p>
                        </CardHeader>
                        <Divider />
                        <CardBody ref={messageRef}>

                              {messages.map((message) => (
                                    <div key={message.id} className=" p-2 " >
                                          <Card isBlurred className="border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black ">
                                                <CardBody className="  flex justify-center"  >
                                                      <p className=" text-lg font-bold">{message.profile_username}</p>
                                                      <span className="pt-2">
                                                            {message.content}
                                                      </span>
                                                      <span className="pt-2 flex justify-end">
                                                            {dayjs().to(dayjs(message.created_at))}...
                                                      </span>
                                                </CardBody>
                                          </Card>
                                    </div>
                              ))}
                        </CardBody>
                  </Card>

            </>



      )
}