import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import AutoCompleteCard from "../AutoCompleteCardUI";

export const SearchIcon = ({ size = 24, strokeWidth = 1.5, width, height, ...props }) => {
      return (
            <svg
                  aria-hidden="true"
                  fill="none"
                  focusable="false"
                  height={height || size}
                  role="presentation"
                  viewBox="0 0 24 24"
                  width={width || size}
                  {...props}
            >
                  <path
                        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={strokeWidth}
                  />
                  <path
                        d="M22 22L20 20"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={strokeWidth}
                  />
            </svg>
      );
};
export default function ModalNav() {
      const { isOpen, onOpen, onOpenChange } = useDisclosure();

      return (
            <>
                  <Button onPress={onOpen} className="w-full"  startContent={<SearchIcon size={18} />}>Search your game</Button>
                  <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg" backdrop="blur">
                        <ModalContent className=" bg-zinc-800">
                              {(onClose) => (
                                    <>
                                          <ModalHeader className="flex flex-col gap-1 text-white"><span className="text-2xl">Search your game</span></ModalHeader>
                                          <ModalBody>
                                                <Input
                                                      classNames={{

                                                            base: "max-w-full  h-10",
                                                            mainWrapper: "h-full",
                                                            input: "text-small",
                                                            inputWrapper:
                                                                  "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",

                                                      }}

                                                      placeholder="Search..."
                                                      size="sm"
                                                      startContent={<SearchIcon size={18} />}
                                                      type="search"
                                                />

                                                <AutoCompleteCard/>
                                          </ModalBody>
                                          <ModalFooter>
                                                <Button color="danger" variant="light" onPress={onClose}>
                                                      Close
                                                </Button>
                                                <Button color="primary" onPress={onClose}>
                                                      Action
                                                </Button>
                                          </ModalFooter>
                                    </>
                              )}
                        </ModalContent>
                  </Modal>
            </>
      );
}