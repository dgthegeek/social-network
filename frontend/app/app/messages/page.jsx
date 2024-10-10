"use client";
import UserCard from "@/_components/cards/userMessageTeaser";
import MobileConversationCardModal from "@/_components/modals/mobile_conversation";
import Conversation from "@/_components/section/conversation";
import { useWebSocket } from "@/context/realTimeContext";
import useMobile from "@/hooks/useMobile";
import useOpenModal from "@/hooks/useOpenModal";
export default function Message() {
  const isMobile = useMobile();

  const { openModal, closeModal, ModalComponent } = useOpenModal();

  const { friends } = useWebSocket();
 

  return (
    <div className="flex">
      <ModalComponent>
        <MobileConversationCardModal
          close={closeModal}
          componentToRender={<Conversation />}
        />
      </ModalComponent>
      <nav className=" flex-1 overflow-y-scroll" aria-label="Directory">
        <h1 className="text-xl font-bold px-6 py-2">Messages</h1>
        <div className="sticky top-0 z-10 border-y border-b-gray-200 border-t-gray-100 bg-gray-50 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900">
          <h3 className={`px-6`}>Friends</h3>
        </div>

        <ul role="list" className="divide-y px-6 divide-gray-100">
          {!friends ? (
            <div className="divide-y">
              <div className="flex cursor-pointer gap-x-4 py-4">
                <div className="h-12 w-12 flex-none rounded-full bg-gray-200 animate-pulse"></div>
                <div className="min-w-0">
                  <div className="h-4 w-[100px] bg-gray-200 rounded mb-2 animate-pulse"></div>
                  <div className="h-4 w-[160px] bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          ) : friends?.length != 0 ? (
            friends.map((friend, index) => (
              <div key={index}
                onClick={() => {
                  if (isMobile) openModal();
                }}
              >
                <UserCard key={index} person={friend} />
              </div>
            ))
          ) : (
            <div className="flex text-gray-400 text-sm py-4 flex-col  items-center">
              You not have any friend yet
            </div>
          )}
        </ul>
      </nav>
      <Conversation />
    </div>
  );
}
