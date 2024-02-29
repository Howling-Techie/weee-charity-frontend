import {Container} from "../../components/Container.jsx";
import {ClientTable} from "../../components/ClientTable.jsx";
import {useEffect, useState} from "react";
import {matchSorter} from "match-sorter";
import {FaCheck} from "react-icons/fa6";
import {Listbox} from "@headlessui/react";
import {LuChevronsUpDown} from "react-icons/lu";
import {Header} from "../../components/Header.jsx";
import testClients from "../../test data/clients.json";
import testTransfers from "../../test data/transfers.json";
import testRoutes from "../../test data/routes.json";

export const Clients = () => {
    const [searchName, setSearchName] = useState(null);
    const [selectedCities, setSelectedCities] = useState([])
    const [filteredClients, setFilteredClients] = useState(testClients);
    const cities = [...new Set(testClients.map(client => client.city))].sort();
    for (const testClient of testClients) {
        testClient.transfers = testTransfers.filter(transfer => transfer.client_id === testClient.id);
        for (const transfer of testClient.transfers) {
            if (transfer.route_id)
                transfer.route = testRoutes.find(route => route.id === transfer.route_id)
        }
    }

    useEffect(() => {
        let filtered = testClients;
        if (searchName) {
            filtered = matchSorter(filtered, searchName, {keys: ['name']});
        }
        if (selectedCities.length > 0) {
            filtered = filtered.filter(client => selectedCities.includes(client.city));
        }
        setFilteredClients(filtered);
    }, [searchName, selectedCities]);

    return (
        <Container>
            <Header path={[{link: "/office", title: "Back Office"}, {link: "/office/clients", title: "Clients"}]}
                    title="Clients"/>
            <div className="grid grid-cols-2 my-2 gap-2">
                <div className="rounded bg-neutral-800 p-2">
                    Search Clients
                    <input
                        className="mt-2 h-9 text-neutral-900 relative w-full rounded bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900/75 focus:ring-offset-2 focus:ring-offset-indigo-300 sm:text-sm"
                        id="name" type="text" placeholder="Search..." onChange={e => setSearchName(e.target.value)}/>
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
            </div>
            <ClientTable clients={filteredClients}/>
        </Container>
    )
}