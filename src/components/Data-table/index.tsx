import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/utilities/Table";
import { Checkbox } from "@/components/utilities/Checkbox";
import useFetch from "@/hooks/useFetch";
import type { ResponseType } from "@/types";
import DataTableRow from "./DataTableRow";
import { useState } from "react";
import { Button } from "@/components/utilities/Button";
import { Input } from "@/components/utilities/Input";

const DataTable: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const { data, isLoading, isError } = useFetch<ResponseType>(
    `https://api.razzakfashion.com?paginate=${pageSize}&page=${currentPage}&search=${searchValue.toLowerCase()}`
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleRowSelect = (id: number, checked: boolean) => {
    setSelectedItems((prev) =>
      checked ? [...prev, id] : prev.filter((itemId) => itemId !== id)
    );
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAllSelected(e.target.checked);
    if (data?.data) {
      setSelectedItems(
        e.target.checked ? data?.data.map((item) => item.id) : []
      );
    }
  };

  return (
    <>
      <div className="my-2 max-w-sm w-full">
        <Input
          placeholder="Search...."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox
                aria-checked={isAllSelected ? "true" : "false"}
                data-state={isAllSelected ? "checked" : "unchecked"}
                checked={isAllSelected}
                onChange={handleSelectAll}
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Email verified at</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell className="text-center text-sm" colSpan={6}>
                Loading...
              </TableCell>
            </TableRow>
          ) : isError ? (
            <TableRow>
              <TableCell
                className="text-red-600 text-center text-sm"
                colSpan={6}
              >
                Something went wrong
              </TableCell>
            </TableRow>
          ) : data?.data?.length === 0 ? (
            <TableRow>
              <TableCell className="text-center text-sm" colSpan={6}>
                No results found
              </TableCell>
            </TableRow>
          ) : (
            data?.data?.map((item, idx) => (
              <DataTableRow
                item={item}
                key={`table-row-${idx}`}
                checked={selectedItems.includes(item.id)}
                onCheckedChange={handleRowSelect}
              />
            ))
          )}
        </TableBody>
      </Table>
      <div className="flex items-center gap-2 justify-end text-sm my-4">
        <div className="inline-flex gap-2 items-center">
          <span>Rows per page</span>
          <select
            value={pageSize}
            className="bg-gray-950 border border-gray-700 rounded-md px-2 py-1"
            onChange={(e) => setPageSize(parseInt(e.target.value))}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>
        <Button
          disabled={data?.prev_page_url ? false : true}
          aria-disabled={data?.prev_page_url ? "false" : "true"}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </Button>
        <div>
          {currentPage * pageSize} of {data?.total}
        </div>
        <Button
          disabled={data?.next_page_url ? false : true}
          aria-disabled={data?.next_page_url ? "false" : "true"}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default DataTable;
