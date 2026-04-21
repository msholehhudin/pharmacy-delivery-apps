import FeeSetting from "@/components/SystemSettings/FeeSetting";
import SettingHeader from "@/components/SystemSettings/SettingHeader";
import SettingTabs from "@/components/SystemSettings/SettingTabs";

const Settings = () => {
  return (
    <div className="min-h-screen">
      <div className="px-8 py-6">
        <SettingHeader />
        <SettingTabs />
        {/* <FeeSetting /> */}
      </div>
    </div>
  );
};

export default Settings;
