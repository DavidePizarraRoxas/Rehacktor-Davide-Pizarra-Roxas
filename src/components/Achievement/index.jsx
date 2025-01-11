import { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Divider, Avatar, ScrollShadow  } from "@nextui-org/react";


export default function Achievements({ game }) {
      const [achievements, setAchievements] = useState([]);
      const [loading, setLoading] = useState(true);




      useEffect(() => {
            async function fetchAchievements() {
                  setLoading(true);
                  const response = await fetch(
                        `${import.meta.env.VITE_API_BASE_URL}games/${game.id}/achievements?key=${import.meta.env.VITE_API_KEY}`
                  );
                  const json = await response.json();
                  setAchievements(json.results);
                  setLoading(false);
            }
            fetchAchievements();
      }, [game.id]);


      return (
            <Card className="border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black h-[463px] ">
                  <CardHeader className="flex gap-3">
                        <h3 className="text-2xl text-center p-2 font-bold">Achievements</h3>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                        <ScrollShadow hideScrollBar>
                        {achievements.map((achievement) => (
                              <div key={achievement.id}>
                                    <Card className=" mb-4" >
                                          <CardBody>
                                                <div className="flex items-center gap-2 mb-2">
                                                      <Avatar isBordered radius="md" src={achievement.image} />
                                                      <p>{achievement.name}</p>
                                                </div>
                                                <p>{achievement.description}</p>
                                          </CardBody>
                                    </Card>
                              </div>
                        ))}
                        </ScrollShadow>

                  </CardBody>
                  <Divider />
            </Card>
      );
}
