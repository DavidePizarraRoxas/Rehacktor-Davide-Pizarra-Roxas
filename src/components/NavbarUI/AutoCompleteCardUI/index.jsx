import { Avatar, Divider } from "@nextui-org/react";

export default function AutoCompleteCard() {
      return (
            <>

                  <div className=" flex justify-start gap-2  p-2">
                        <Avatar isBordered color="pramary" radius="md" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                        <h3 className="mt-2 text-lg text-white">testo</h3>

                  </div>
                  <Divider className=" bg-white"/>
            </>

      )
}