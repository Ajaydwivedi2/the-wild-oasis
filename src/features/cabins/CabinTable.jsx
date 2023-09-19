import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabin } from "./useCabin";
import Table from "../../ui/Table";
import { useSearchParams } from "react-router-dom";
import Menus from "../../ui/Menus";

function CabinTable() {
  const { isLoading, cabins } = useCabin();
  const [searchParam] = useSearchParams();

  if (isLoading) return <Spinner />;

  // 1) FILTER
  const filteredValue = searchParam.get("discount") || "all";

  let filteredCabins;
  if (filteredValue === "all") filteredCabins = cabins;
  if (filteredValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filteredValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  // 2) SORTED
  const sortBy = searchParam.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");

  const modifier = direction === "asc" ? 1 : -1;
  const sortCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        ></Table.Body>
      </Table>
    </Menus>
  );
}

export default CabinTable;
