import {Container} from "../../components/Container.jsx";
import {ClientTable} from "../../components/ClientTable.jsx";
import {useEffect, useState} from "react";
import {matchSorter} from "match-sorter";
import {FaCheck} from "react-icons/fa6";
import {Listbox} from "@headlessui/react";
import {LuChevronsUpDown} from "react-icons/lu";
import {Header} from "../../components/Header.jsx";

export const Clients = () => {
    const testClients = [
        {
            "id": 1,
            "name": "ABC Company",
            "transfer_count": 5,
            "email": "abc@example.com",
            "contact_number": "+44 20 1234 5678",
            "city": "London",
            "postcode": "SW1A 1AA"
        },
        {
            "id": 2,
            "name": "XYZ Ltd",
            "transfer_count": 10,
            "email": "xyz@example.com",
            "contact_number": "+44 121 345 6789",
            "city": "Manchester",
            "postcode": "M1 1AA"
        },
        {
            "id": 3,
            "name": "PQR Solutions",
            "transfer_count": 7,
            "email": "pqr@example.com",
            "contact_number": "+44 113 234 5678",
            "city": "Leeds",
            "postcode": "LS1 1AA"
        },
        {
            "id": 4,
            "name": "LMN Enterprises",
            "transfer_count": 12,
            "email": "lmn@example.com",
            "contact_number": "+44 141 456 7890",
            "city": "Glasgow",
            "postcode": "G1 1AA"
        },
        {
            "id": 5,
            "name": "DEF Group",
            "transfer_count": 8,
            "email": "def@example.com",
            "contact_number": "+44 191 345 6789",
            "city": "Edinburgh",
            "postcode": "EH2 1AA"
        },
        {
            "id": 6,
            "name": "RST Corporation",
            "transfer_count": 15,
            "email": "rst@example.com",
            "contact_number": "+44 113 345 6789",
            "city": "London",
            "postcode": "SW2A 1AA"
        },
        {
            "id": 7,
            "name": "JKL Limited",
            "transfer_count": 9,
            "email": "jkl@example.com",
            "contact_number": "+44 121 456 7890",
            "city": "Liverpool",
            "postcode": "L1 1AA"
        },
        {
            "id": 8,
            "name": "UVW Solutions",
            "transfer_count": 6,
            "email": "uvw@example.com",
            "contact_number": "+44 161 234 5678",
            "city": "Sheffield",
            "postcode": "S1 1AA"
        },
        {
            "id": 9,
            "name": "GHI Enterprises",
            "transfer_count": 11,
            "email": "ghi@example.com",
            "contact_number": "+44 141 567 8901",
            "city": "Edinburgh",
            "postcode": "EH1 1AA"
        },
        {
            "id": 10,
            "name": "MNO Group",
            "transfer_count": 13,
            "email": "mno@example.com",
            "contact_number": "+44 113 456 7890",
            "city": "Leicester",
            "postcode": "LE1 1AA"
        },
        {
            "id": 11,
            "name": "PQS Ltd",
            "transfer_count": 14,
            "email": "pqs@example.com",
            "contact_number": "+44 113 567 8901",
            "city": "Brighton",
            "postcode": "BN3 1AA"
        },
        {
            "id": 12,
            "name": "EFG Corporation",
            "transfer_count": 16,
            "email": "efg@example.com",
            "contact_number": "+44 121 567 8901",
            "city": "Cardiff",
            "postcode": "CF1 1AA"
        },
        {
            "id": 13,
            "name": "NOP Solutions",
            "transfer_count": 18,
            "email": "nop@example.com",
            "contact_number": "+44 161 345 6789",
            "city": "Brighton",
            "postcode": "BN2 1AA"
        },
        {
            "id": 14,
            "name": "HIJ Enterprises",
            "transfer_count": 20,
            "email": "hij@example.com",
            "contact_number": "+44 113 678 9012",
            "city": "Southampton",
            "postcode": "SO1 1AA"
        },
        {
            "id": 15,
            "name": "TUV Group",
            "transfer_count": 21,
            "email": "tuv@example.com",
            "contact_number": "+44 20 2345 6789",
            "city": "Nottingham",
            "postcode": "NG1 1AA"
        },
        {
            "id": 16,
            "name": "JKM Limited",
            "transfer_count": 24,
            "email": "jkm@example.com",
            "contact_number": "+44 113 789 0123",
            "city": "Leicester",
            "postcode": "LE1 1AA"
        },
        {
            "id": 17,
            "name": "STU Corporation",
            "transfer_count": 27,
            "email": "stu@example.com",
            "contact_number": "+44 20 3456 7890",
            "city": "Brighton",
            "postcode": "BN1 1AA"
        },
        {
            "id": 18,
            "name": "VWX Ltd",
            "transfer_count": 30,
            "email": "vwx@example.com",
            "contact_number": "+44 20 4567 8901",
            "city": "Oxford",
            "postcode": "OX1 1AA"
        },
        {
            "id": 19,
            "name": "MNP Solutions",
            "transfer_count": 3,
            "email": "mnp@example.com",
            "contact_number": "+44 113 890 1234",
            "city": "London",
            "postcode": "SW1B 1AA"
        },
        {
            "id": 20,
            "name": "LMK Enterprises",
            "transfer_count": 36,
            "email": "lmk@example.com",
            "contact_number": "+44 20 5678 9012",
            "city": "London",
            "postcode": "SE1A 1AA"
        }
    ]
    const [searchName, setSearchName] = useState(null);
    const [selectedCities, setSelectedCities] = useState([])
    const [filteredClients, setFilteredClients] = useState(testClients);
    const cities = [...new Set(testClients.map(client => client.city))].sort();

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