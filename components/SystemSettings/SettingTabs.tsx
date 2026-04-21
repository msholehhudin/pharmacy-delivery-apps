import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FeeSetting from "./FeeSetting";
import DistanceSetting from "./DistanceRateSetting";
import { Separator } from "@/components/ui/separator";

const TABS = ["fee", "distance"] as const;
type Tab = (typeof TABS)[number];

const SettingTabs = () => {
  return (
    <Tabs defaultValue="fee">
      <TabsList>
        <TabsTrigger className="cursor-pointer" value="fee">
          Fee Setting
        </TabsTrigger>
        <TabsTrigger className="cursor-pointer" value="distance">
          Distance Setting
        </TabsTrigger>
      </TabsList>
      <Separator className="mb-4 mt-[-8]" />
      <TabsContent value="fee">
        <FeeSetting />
      </TabsContent>
      <TabsContent value="distance">
        <DistanceSetting />
      </TabsContent>
    </Tabs>
  );
};

export default SettingTabs;
