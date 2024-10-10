import Alert from "@/_components/shared/alert";
import { queryClient } from "@/app/layout";
import useFetch from "@/hooks/useFetch";
import usePaginatedFetch from "@/hooks/usePaginatedFetch";
import Image from "next/image";
import { useState } from "react";
import { set } from "react-hook-form";
import { useQuery } from "react-query";

function GroupJoinRequestTab() {
  const fetcher = useFetch();
  const initialEndpoint = `notifications?notification=groups_requested`;
  const [groupID, setGroupID] = useState();
  const [error, setError] = useState();
  const [memberID, setMemberID] = useState();
  const [status, setStatus] = useState();
  const {
    isLoading,
    uniqueArray: notifications,
    loadMore,
    hasNextPage,
  } = usePaginatedFetch(
    fetcher,
    initialEndpoint,
    2,
    "groups-requested-notifications"
  );

  const options = {
    method: "POST",
    endpoint: `groups-members?group_id=${groupID}&response=${status}&action=request&member_id=${memberID}`,
  };
  const { refetch: groupRequestResponse, isLoading: followRequestLoading } =
    useQuery(["group-request", options], () => fetcher(options), {
      onSuccess: () => {
        setError("");
        loadMore();
      },
      onError: (error) => {
        setError(error);
      },
      enabled: !!groupID,
    });

  return (
    <section>
      <h1 className="text-xl font-bold capitalize mb-2">Group Request</h1>
      {isLoading ? (
        <>Loading</>
      ) : (
        <div className="space-y-2">
          {notifications?.map((notification, i) => (
            <div key={i} className="flex items-center divide-y-1  gap-1">
              <div className="flex italic font-semibold items-center gap-2">
                <img
                  width={100}
                  height={100}
                  src={
                    notification.sender_avatar != ""
                      ? `${SiteConfig()}/api/static/uploads/${
                          notification.sender_avatar
                        }`
                      : "/unknown.jpg"
                  }
                  alt="user profile picture"
                  className="w-9 h-9 rounded-full"
                />
                {`${notification.sender_first_name} ${notification.sender_last_name} `}
              </div>
              has requested to join
              <span className="italic font-semibold">{notification.title}</span>
              <>
                <button
                  disabled={followRequestLoading}
                  onClick={() => {
                    setGroupID(notification.group_id);
                    setMemberID(notification.sender_id);
                    setStatus("accepted");
                    groupRequestResponse();
                  }}
                  className="bg-blue-600 disabled:opacity-35 text-sm rounded-md px-3 py-2 text-white"
                >
                  Accept
                </button>
                <button
                  disabled={followRequestLoading}
                  onClick={() => {
                    setGroupID(notification.group_id);
                    setMemberID(notification.sender_id);
                    setStatus("rejected");
                    groupRequestResponse();
                  }}
                  className="bg-pink-600 disabled:opacity-35 text-sm rounded-md px-3 py-2 text-white"
                >
                  Decline
                </button>
              </>
            </div>
          ))}
        </div>
      )}
      {hasNextPage ? (
        <div
          onClick={loadMore}
          className="text-center text-sm text-blue-600 w-fit hover:underline mx-auto cursor-pointer"
        >
          See more notifications
        </div>
      ) : (
        <div className="text-gray-700 text-center  mx-auto w-fit">
          <small>No more notifications</small>
        </div>
      )}
      {error && (
        <Alert message={"Failed to perform this action"} status="error" />
      )}
    </section>
  );
}

export default GroupJoinRequestTab;
