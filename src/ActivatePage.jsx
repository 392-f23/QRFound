import Activator from "./components/activation/Activator";
import "./ActivatePage.css";
import { useProfile } from "./utilities/profile";

const ActivatePage = () => {
  const [user] = useProfile();

  return (
    <div className="activate-page">
      <Activator user={user}></Activator>
    </div>
  );
};

export default ActivatePage;
