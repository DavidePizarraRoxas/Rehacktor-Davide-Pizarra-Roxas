import { Avatar, Divider } from "@nextui-org/react";

export default function AutoCompleteCard({ game }) {

      const {name, background_image } = game

      return (
            <>
                  <div className=" flex justify-start gap-2  p-2">
                        <Avatar isBordered color="pramary" radius="md" src={background_image} />
                        <h3 className="mt-2 text-lg text-white">{name}</h3>
                  </div>
                  <Divider className=" bg-white mb-1" />
            </>

      );
}