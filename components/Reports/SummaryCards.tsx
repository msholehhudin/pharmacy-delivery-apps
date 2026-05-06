import { Card, CardContent } from "../ui/card";

const data = [
  { title: "Total Revenue", value: "Rp 12.000.000" },
  { title: "Corporate Fee", value: "Rp 4.000.000" },
  { title: "System Fee", value: "Rp 2.000.000" },
  { title: "Courier Fee", value: "Rp 3.000.000" },
  { title: "Operator Fee", value: "Rp 3.000.000" },
];

const SummaryCards = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {data.map((item) => (
        <Card key={item.title}>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">{item.title}</p>
            <p className="text-lg font-semibold">{item.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SummaryCards;
