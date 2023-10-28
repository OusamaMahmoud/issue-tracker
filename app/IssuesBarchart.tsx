"use client";
import {
  Bar,
  BarChart,
  Label,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
interface Props {
  open: number;
  inprogress: number;
  closed: number;
}
const IssuesBarchart = ({ open, closed, inprogress }: Props) => {
  const data = [
    { label: "Open", value: open },
    { label: "Closed", value: closed },
    { label: "In_Progress", value: inprogress },
  ];

  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <BarChart data={data}>
        <XAxis dataKey={"label"} />
        <YAxis />
        <Bar dataKey={"value"} barSize={50} style={{ fill: "var(--accent-9)" }} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default IssuesBarchart;
