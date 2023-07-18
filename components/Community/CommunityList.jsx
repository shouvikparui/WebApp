import CommunityCard from "./CommunityCard";

function CommunityList({ userId, data }) {
  return (
    <div className="flex flex-col">
      {data?.map((obj, id) => (
        <CommunityCard userId={userId} {...obj}/>
      ))}
    </div>
  );
}

export default CommunityList;
