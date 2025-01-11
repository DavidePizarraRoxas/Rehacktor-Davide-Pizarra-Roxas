import { useState, useEffect, useContext } from 'react'
import { Form, Input, Button, } from "@nextui-org/react";
import supabase from "../supabase/client";
import SessionContext from '../context/SessionContext';
import { Toaster, toast } from 'sonner';
import Avatar from "../components/NavbarUI/Avatar/Avatar";

export const MailIcon = (props) => {
      return (
            <svg
                  aria-hidden="true"
                  fill="none"
                  focusable="false"
                  height="1em"
                  role="presentation"
                  viewBox="0 0 24 24"
                  width="1em"
                  {...props}
            >
                  <path
                        d="M17 3.5H7C4 3.5 2 5 2 8.5V15.5C2 19 4 20.5 7 20.5H17C20 20.5 22 19 22 15.5V8.5C22 5 20 3.5 17 3.5ZM17.47 9.59L14.34 12.09C13.68 12.62 12.84 12.88 12 12.88C11.16 12.88 10.31 12.62 9.66 12.09L6.53 9.59C6.21 9.33 6.16 8.85 6.41 8.53C6.67 8.21 7.14 8.15 7.46 8.41L10.59 10.91C11.35 11.52 12.64 11.52 13.4 10.91L16.53 8.41C16.85 8.15 17.33 8.2 17.58 8.53C17.84 8.85 17.79 9.33 17.47 9.59Z"
                        fill="currentColor"
                  />
            </svg>
      );
};


export default function AppAccount() {


      const session = useContext(SessionContext)
      const [loading, setLoading] = useState(true)
      const [username, setUsername] = useState(null)
      const [first_name, setFirst_name] = useState(null)
      const [last_name, setLast_name] = useState(null)
      const [avatar_url, setAvatarUrl] = useState(null)

      useEffect(() => {
            let ignore = false
            async function getProfile() {
                  setLoading(true)
                  const { user } = session

                  const { data, error } = await supabase
                        .from('profiles')
                        .select(`username, first_name, last_name, avatar_url`)
                        .eq('id', user.id)
                        .single()

                  if (!ignore) {
                        if (error) {
                              console.warn(error)
                        } else if (data) {
                              setUsername(data.username)
                              setFirst_name(data.first_name)
                              setLast_name(data.last_name)
                              setAvatarUrl(data.avatar_url)
                        }
                  }

                  setLoading(false)
            }

            getProfile()

            return () => {
                  ignore = true
            }
      }, [session])

      async function updateProfile(event, avatarUrl) {
            event.preventDefault()

            setLoading(true)
            const { user } = session

            const updates = {
                  id: user.id,
                  username,
                  first_name,
                  last_name,
                  avatar_url: avatarUrl,
                  updated_at: new Date(),
            }

            const { error } = await supabase.from('profiles').upsert(updates)

            if (error) {
                  toast.error(error.message)
            } else {
                  toast.success('User Updated!')
                  setAvatarUrl(avatarUrl)
            }
            setLoading(false)
      }

      return (
            <>
                  <h1 className=" text-center text-6xl font-bold mt-6 mb-2 card">
                        Update your Profile
                  </h1>
                  <div className=" flex justify-center p-5 mt-10">
                        <Form className=" flex justify-center items-center w-[60%] h-[790px] border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black shadow-md shadow-white rounded-lg  " validationBehavior="native" onSubmit={updateProfile} >
                              {/* Input */}
                              <div className="ps-24 pe-24  w-[57%] ">
                                    <div className=' flex justify-center mt-6 '>
                                          <Avatar
                                                url={avatar_url}
                                                size={320}

                                                onUpload={(event, url) => {
                                                      updateProfile(event, url)
                                                }}
                                          />

                                    </div>

                                    <Input
                                          value={username || ''}
                                          className="mb-10 "
                                          label="Username"
                                          errorMessage="Please enter a valid username"
                                          labelPlacement="outside"
                                          name="username"
                                          type="text"
                                          onChange={(e) => setUsername(e.target.value)}
                                          startContent={
                                                <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                          }
                                    />
                                    <Input
                                          value={first_name || ''}
                                          className="mb-10 "
                                          label="First name"
                                          errorMessage="Please enter a valid first name"
                                          labelPlacement="outside"
                                          name="first_name"
                                          placeholder="Enter your first name"
                                          type="text"
                                          onChange={(e) => setFirst_name(e.target.value)}
                                          startContent={
                                                <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                          }
                                    />
                                    <Input
                                          value={last_name || ''}
                                          className="mb-10 "
                                          label="Last name"
                                          errorMessage="Please enter a valid last name"
                                          labelPlacement="outside"
                                          name="last_name"
                                          placeholder="Enter your last name"
                                          type="text"
                                          onChange={(e) => setLast_name(e.target.value)}
                                          startContent={
                                                <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                          }
                                    />
                                    <Input
                                          value={session.user.email} disabled
                                          className="mb-10 "
                                          label="Email"
                                          errorMessage="Please enter a valid email"
                                          labelPlacement="outside"
                                          name="email"
                                          placeholder="Enter your email"
                                          type="email"
                                          startContent={
                                                <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                          }
                                    />

                                    <div className=' flex justify-center'>
                                          <Button color="primary" variant="ghost" type="submit" disabled={loading}>
                                                {loading ? 'Loading ...' : 'Update'}
                                          </Button>
                                          <Toaster richColors />
                                    </div>

                              </div>
                        </Form>
                  </div>
            </>
      )
}