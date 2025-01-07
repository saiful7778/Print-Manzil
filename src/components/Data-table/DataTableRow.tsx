import { TableCell, TableRow } from "@/components/utilities/Table";
import { Checkbox } from "@/components/utilities/Checkbox";
import type { ItemDataType } from "@/types";
import moment from "moment";

const DataTableRow: React.FC<{
  item: ItemDataType;
  checked: boolean;
  onCheckedChange: (id: number, checked: boolean) => void;
}> = ({ item, checked, onCheckedChange }) => {
  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckedChange(item.id, e.target.checked);
  };

  return (
    <TableRow
      className="data-[state=checked]:bg-gray-800"
      data-state={checked ? "checked" : "unchecked"}
    >
      <TableCell>
        <Checkbox
          aria-checked={checked ? "true" : "false"}
          data-state={checked ? "checked" : "unchecked"}
          checked={checked}
          onChange={handleSelect}
        />
      </TableCell>
      <TableCell>{item.name}</TableCell>
      <TableCell>{item.email}</TableCell>
      <TableCell>{moment(item.email_verified_at).fromNow()}</TableCell>
      <TableCell>
        {moment(item.created_at).format("MMM DD YY, h:mm a")}
      </TableCell>
      <TableCell>
        {moment(item.updated_at).format("MMM DD YY, h:mm a")}
      </TableCell>
    </TableRow>
  );
};

export default DataTableRow;
