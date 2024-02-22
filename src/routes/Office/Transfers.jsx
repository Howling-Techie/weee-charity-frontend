import {FaCheck, FaChevronLeft, FaChevronRight} from "react-icons/fa6";
import {Listbox} from "@headlessui/react";
import {LuChevronsUpDown} from "react-icons/lu";
import {Container} from "../../components/Container.jsx";
import {useEffect, useState} from "react";
import {matchSorter} from "match-sorter";
import {TransferTable} from "../../components/TransferTable.jsx";

export const Transfers = () => {
    const testTransfers = [
        {
            "id": 1,
            "reference_number": "TRF001",
            "client": {
                "id": 1,
                "name": "AlphaTech Ltd",
                "is_business": true
            },
            "city": "London",
            "postcode": "SW1A 1AA",
            "submission_date": "2024-02-20",
            "status": "approved",
            "route_assigned": true,
            "route": {
                "id": 1,
                "date": "2024-03-05",
                "name": "Southern England Route"
            }
        },
        {
            "id": 2,
            "reference_number": "TRF002",
            "client": {
                "id": 2,
                "name": "BetaTech Solutions",
                "is_business": true
            },
            "city": "Manchester",
            "postcode": "M1 1AA",
            "submission_date": "2024-02-21",
            "status": "collected",
            "route_assigned": true,
            "route": {
                "id": 2,
                "date": "2024-03-10",
                "name": "Northern England Route"
            }
        },
        {
            "id": 3,
            "reference_number": "TRF003",
            "client": {
                "id": 3,
                "name": "CharlieTech Ltd",
                "is_business": true
            },
            "city": "Birmingham",
            "postcode": "B1 1AA",
            "submission_date": "2024-02-22",
            "status": "denied",
            "reason": "Unable to collect whitegoods.",
            "route_assigned": false
        },
        {
            "id": 4,
            "reference_number": "TRF004",
            "client": {
                "id": 4,
                "name": "David Smith",
                "is_business": false
            },
            "city": "Glasgow",
            "postcode": "G1 1AA",
            "submission_date": "2024-02-23",
            "status": "collected",
            "route_assigned": true,
            "route": {
                "id": 3,
                "date": "2024-03-15",
                "name": "Scotland Route"
            }
        },
        {
            "id": 5,
            "reference_number": "TRF005",
            "client": {
                "id": 5,
                "name": "EchoTech Ltd",
                "is_business": true
            },
            "city": "Bristol",
            "postcode": "BS1 1AA",
            "submission_date": "2024-02-24",
            "status": "pending",
            "route_assigned": false
        },
        {
            "id": 6,
            "reference_number": "TRF006",
            "client": {
                "id": 6,
                "name": "Foxtrot Technologies",
                "is_business": true
            },
            "city": "Cardiff",
            "postcode": "CF1 1AA",
            "submission_date": "2024-02-25",
            "status": "pending",
            "route_assigned": false
        },
        {
            "id": 7,
            "reference_number": "TRF007",
            "client": {
                "id": 7,
                "name": "George Brown",
                "is_business": false
            },
            "city": "Liverpool",
            "postcode": "L1 1AA",
            "submission_date": "2024-02-26",
            "status": "failed",
            "route_assigned": true,
            "route": {
                "id": 4,
                "date": "2024-03-20",
                "name": "Northwest England Route"
            }
        },
        {
            "id": 8,
            "reference_number": "TRF008",
            "client": {
                "id": 8,
                "name": "HotelTech Solutions",
                "is_business": true
            },
            "city": "Edinburgh",
            "postcode": "EH1 1AA",
            "submission_date": "2024-02-27",
            "status": "approved",
            "route_assigned": false
        },
        {
            "id": 9,
            "reference_number": "TRF009",
            "client": {
                "id": 9,
                "name": "IndiaTech Ltd",
                "is_business": true
            },
            "city": "Leicester",
            "postcode": "LE1 1AA",
            "submission_date": "2024-02-28",
            "status": "approved",
            "route_assigned": true,
            "route": {
                "id": 5,
                "date": "2024-03-25",
                "name": "Midlands Route"
            }
        },
        {
            "id": 10,
            "reference_number": "TRF010",
            "client": {
                "id": 10,
                "name": "Juliette Evans",
                "is_business": false
            },
            "city": "Southampton",
            "postcode": "SO1 1AA",
            "submission_date": "2024-03-01",
            "status": "pending",
            "route_assigned": false
        }
    ]

    const [searchTerm, setSearchTerm] = useState(null);

    const [selectedStatuses, setSelectedStatus] = useState([])
    const statuses = ["collected", "failed", "approved", "pending", "denied"];

    const [selectedCities, setSelectedCities] = useState([])
    const cities = [...new Set(testTransfers.map(transfer => transfer.city))].sort();

    const [selectedRoutes, setSelectedRoutes] = useState([])
    const routes = [{
        id: -1,
        name: "Unassigned"
    }, ...new Set(testTransfers.filter(transfer => transfer.route).map(transfer => transfer.route))].sort();

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
            console.log(selectedRoutes)
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
            <div>
                <div>
                    <nav className="sm:hidden" aria-label="Back">
                        <a href="/office"
                           className="flex items-center text-sm font-medium text-neutral-400 hover:text-neutral-200">
                            <FaChevronLeft className="-ml-1 mr-1 h-3 w-3 flex-shrink-0 text-neutral-500"
                                           aria-hidden="true"/>
                            Back
                        </a>
                    </nav>
                    <nav className="hidden sm:flex" aria-label="Breadcrumb">
                        <ol role="list" className="flex items-center space-x-4">
                            <li>
                                <div className="flex">
                                    <a href="/office"
                                       className="text-sm font-medium text-neutral-400 hover:text-neutral-200">
                                        Back Office
                                    </a>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <FaChevronRight className="h-3 w-3 flex-shrink-0 text-neutral-500"
                                                    aria-hidden="true"/>
                                    <a href="/office/transfers" aria-current="page"
                                       className="ml-4 text-sm font-medium text-neutral-400 hover:text-neutral-200">
                                        Transfers
                                    </a>
                                </div>
                            </li>
                        </ol>
                    </nav>
                </div>
                <div className="my-2 md:flex md:items-center md:justify-between">
                    <div className="min-w-0 flex-1">
                        <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
                            Transfers
                        </h2>
                    </div>
                </div>
            </div>
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