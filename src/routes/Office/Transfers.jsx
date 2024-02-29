import {FaCheck} from "react-icons/fa6";
import {Listbox} from "@headlessui/react";
import {LuChevronsUpDown} from "react-icons/lu";
import {Container} from "../../components/Container.jsx";
import {useEffect, useState} from "react";
import {matchSorter} from "match-sorter";
import {TransferTable} from "../../components/TransferTable.jsx";
import {Header} from "../../components/Header.jsx";
import testTransfers from "../../test data/transfers.json";
import testClients from "../../test data/clients.json";
import testRoutes from "../../test data/routes.json";

export const Transfers = () => {

    const [searchTerm, setSearchTerm] = useState(null);

    const [selectedStatuses, setSelectedStatus] = useState([])
    const statuses = ["collected", "failed", "approved", "pending", "denied"];

    const [selectedCities, setSelectedCities] = useState([])
    const cities = [...new Set(testTransfers.map(transfer => transfer.city))].sort();

    const [selectedRoutes, setSelectedRoutes] = useState([])

    testTransfers.map(transfer => {
        transfer.route = testRoutes.find(route => route.id === transfer.route_id);
        transfer.client = testClients.find(client => client.id === transfer.client_id);
    });

    const routes = [{
        id: -1,
        name: "Unassigned"
    }, ...new Set(testTransfers.filter(transfer => transfer.route_id).map(transfer => transfer.route))].sort();

    const [filteredTransfers, setFilteredTransfers] = useState(testTransfers);

    useEffect(() => {
        let filtered = testTransfers;
        if (searchTerm) {
            filtered = matchSorter(filtered, searchTerm, {keys: ['reference_number', 'client.name', 'city', 'postcode']});
        }
        if (selectedCities.length > 0) {
            filtered = filtered.filter(transfer => selectedCities.includes(transfer.city));
        }
        if (selectedRoutes.length > 0) {
            filtered = filtered
                .filter(transfer => (transfer.route && selectedRoutes.includes(transfer.route.id)) ||
                    (selectedRoutes.includes(-1) && transfer.route_assigned === false && transfer.status === "approved"));
        }
        if (selectedStatuses.length > 0) {
            filtered = filtered.filter(transfer => selectedStatuses.includes(transfer.status));
        }
        setFilteredTransfers(filtered);
    }, [searchTerm, selectedCities, selectedRoutes, selectedStatuses]);
    return (
        <Container>
            <Header path={[{link: "/office", title: "Back Office"}, {link: "/office/transfers", title: "Transfers"}]}
                    title="Transfers"/>
            <div className="grid grid-cols-2 my-2 gap-2">
                <div className="rounded bg-neutral-800 p-2">
                    Search Transfers
                    <input
                        className="mt-2 h-9 text-neutral-900 relative w-full rounded bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900/75 focus:ring-offset-2 focus:ring-offset-indigo-300 sm:text-sm"
                        id="name" type="text" placeholder="Search..." onChange={e => setSearchTerm(e.target.value)}/>
                </div>
                <div className="rounded bg-neutral-800 p-2">
                    Filter By City
                    <div className="w-full" style={{zIndex: 5, position: "relative"}}>
                        <Listbox value={selectedCities} onChange={setSelectedCities} multiple>
                            <div className="z-20 mt-2">
                                <Listbox.Button
                                    className="text-neutral-900 relative w-full rounded bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900/75 focus:ring-offset-2 focus:ring-offset-indigo-300 sm:text-sm">
                                    <span
                                        className="block truncate">{selectedCities.length > 0 ? selectedCities.map((city) => city).join(', ') : "Select Cities..."}</span>
                                    <span
                                        className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <LuChevronsUpDown
                  className="h-5 w-5 text-neutral-400"
                  aria-hidden="true"
              />
            </span>
                                </Listbox.Button>
                                <Listbox.Options
                                    className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                    {cities.map((city, cityIdx) => (
                                        <Listbox.Option
                                            key={cityIdx}
                                            className={({active}) =>
                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                    active ? 'bg-indigo-300 text-indigo-900' : 'text-neutral-900'
                                                }`
                                            }
                                            value={city}
                                        >
                                            {({selected}) => (
                                                <>
                      <span
                          className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                          }`}
                      >
                        {city}
                      </span>
                                                    {selected ? (
                                                        <span
                                                            className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                          <FaCheck className="h-5 w-5" aria-hidden="true"/>
                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </div>
                        </Listbox>
                    </div>
                </div>
                <div className="rounded bg-neutral-800 p-2">
                    Filter By Status
                    <div className="w-full" style={{zIndex: 5, position: "relative"}}>
                        <Listbox value={selectedStatuses} onChange={setSelectedStatus} multiple>
                            <div className="z-20 mt-2">
                                <Listbox.Button
                                    className="text-neutral-900 relative w-full rounded bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900/75 focus:ring-offset-2 focus:ring-offset-indigo-300 sm:text-sm">
                                    <span
                                        className="block truncate">{selectedStatuses.length > 0 ? selectedStatuses.map((status) => status.at(0).toUpperCase() + status.slice(1)).join(', ') : "Select Statuses..."}</span>
                                    <span
                                        className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <LuChevronsUpDown
                  className="h-5 w-5 text-neutral-400"
                  aria-hidden="true"
              />
            </span>
                                </Listbox.Button>
                                <Listbox.Options
                                    className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                    {statuses.map((status, statusIdx) => (
                                        <Listbox.Option
                                            key={statusIdx}
                                            className={({active}) =>
                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                    active ? 'bg-indigo-300 text-indigo-900' : 'text-neutral-900'
                                                }`
                                            }
                                            value={status}
                                        >
                                            {({selected}) => (
                                                <>
                      <span
                          className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                          }`}
                      >
                        {status.at(0).toUpperCase() + status.slice(1)}
                      </span>
                                                    {selected ? (
                                                        <span
                                                            className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                          <FaCheck className="h-5 w-5" aria-hidden="true"/>
                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </div>
                        </Listbox>
                    </div>
                </div>
                <div className="rounded bg-neutral-800 p-2">
                    Filter By Route
                    <div className="w-full" style={{zIndex: 5, position: "relative"}}>
                        <Listbox value={selectedRoutes} onChange={setSelectedRoutes} multiple>
                            <div className="z-20 mt-2">
                                <Listbox.Button
                                    className="text-neutral-900 relative w-full rounded bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900/75 focus:ring-offset-2 focus:ring-offset-indigo-300 sm:text-sm">
                                    <span
                                        className="block truncate">{selectedRoutes.length > 0 ? selectedRoutes.map(routeID => routes.find(route => route.id === routeID).name).join(', ') : "Select Routes..."}</span>
                                    <span
                                        className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <LuChevronsUpDown
                  className="h-5 w-5 text-neutral-400"
                  aria-hidden="true"
              />
            </span>
                                </Listbox.Button>
                                <Listbox.Options
                                    className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                    {routes.map((route, routeIdx) => (
                                        <Listbox.Option
                                            key={routeIdx}
                                            className={({active}) =>
                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                    active ? 'bg-indigo-300 text-indigo-900' : 'text-neutral-900'
                                                }`
                                            }
                                            value={route.id}
                                        >
                                            {({selected}) => (
                                                <>
                      <span
                          className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                          }`}
                      >
                        {route.name}
                      </span>
                                                    {selected ? (
                                                        <span
                                                            className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                          <FaCheck className="h-5 w-5" aria-hidden="true"/>
                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </div>
                        </Listbox>
                    </div>
                </div>
            </div>
            <TransferTable transfers={filteredTransfers}/>
        </Container>
    )
}