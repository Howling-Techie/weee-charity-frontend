import {
    FaArrowRightArrowLeft,
    FaBan,
    FaCheck,
    FaRegClock,
    FaTriangleExclamation,
    FaVanShuttle,
    FaXmark,
    FaUserTie
} from "react-icons/fa6";
import {Fragment, useState} from "react";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const ClientTable = ({clients}) => {
    const transfers = [
        {
            "id": 1,
            "status": "approved",
            "date": new Date(2024, 0, 10),
            "routeAssigned": true,
            "route": {name: "London", id: 12, date: new Date(2024, 2, 8)},
            "itemCount": 50
        },
        {
            "id": 2,
            "status": "pending",
            "date": new Date(2024, 0, 12),
            "routeAssigned": false,
            "route": null,
            "itemCount": 20
        },
        {
            "id": 3,
            "status": "denied",
            "date": new Date(2024, 0, 14),
            "routeAssigned": false,
            "route": null,
            "reason": "Unable to collect whitegoods",
            "itemCount": 10
        }
    ]
    const [selectedClient, setSelectedClient] = useState(null);

    const locations = [...new Set(clients.map(client => client.city))].sort();

    return (
        <div className="inline-block min-w-full align-middle rounded-lg overflow-clip">
            <table className="min-w-full">
                <thead className="bg-neutral-800 text-white text-sm font-semibold">
                <tr>
                    <th scope="col"
                        className="py-3.5 pl-4 pr-3 text-left sm:pl-3">
                        Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left">
                        Email
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left">
                        Contact Number
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left">
                        Post Code
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left">
                        Transfer Count
                    </th>
                </tr>
                </thead>
                <tbody className="bg-neutral-800">
                {locations.map((location) => (
                    <Fragment key={location}>
                        <tr className="border-t border-gray-800">
                            <th
                                colSpan={5}
                                scope="colgroup"
                                className="bg-neutral-700 py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-100 sm:pl-3"
                            >
                                {location}
                            </th>
                        </tr>
                        {clients.filter(client => client.city === location).map((client, clientIdx) => (
                            <Fragment key={client.id}>
                                <tr
                                    className={classNames(clientIdx === 0 ? 'border-gray-700' : 'border-gray-700', 'border-t text-gray-300 text-sm')}
                                >
                                    <td className="whitespace-nowrap py-2 pl-4 pr-3 text-gray-200 sm:pl-3">
                                        <div className="flex flex-row justify-start"><a
                                            href={`/office/clients/${client.id}`}><FaUserTie
                                            className="mr-2 p-1 rounded bg-indigo-600 text-white text-xl"/></a>{client.name}
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-2">{client.email}</td>
                                    <td className="whitespace-nowrap px-3 py-2">{client.contact_number}</td>
                                    <td className="whitespace-nowrap px-3 py-2">{client.postcode}</td>
                                    <td className="whitespace-nowrap px-3 py-2">
                                        <div className="flex flex-row justify-between">
                                            <div>{client.transfer_count}</div>
                                            <div
                                                className="relative whitespace-nowrap pl-3 pr-3 text-right">
                                                <button onClick={e => {
                                                    selectedClient === client.id ? setSelectedClient(null) : setSelectedClient(client.id)
                                                }}
                                                        className="text-indigo-500 hover:text-indigo-600">
                                                    View Transfers<span
                                                    className="sr-only">, {client.name}</span>
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                {selectedClient === client.id &&
                                    <tr
                                        key={client.id}
                                        className="text-white"
                                    >
                                        <td className="py-2 text-gray-200"
                                            colSpan={6}>
                                            <div className="mx-3 bg-neutral-900 px-2 rounded overflow-clip">
                                                <table
                                                    className="min-w-full divide-y divide-gray-700 text-sm text-white">
                                                    <thead>
                                                    <tr>
                                                        <th className="py-3.5 pl-4 pr-3 text-left sm:pl-0 font-semibold">
                                                            Reference
                                                        </th>
                                                        <th className="px-3 py-3.5 text-left w-8 font-semibold">
                                                            Status
                                                        </th>
                                                        <th className="px-3 py-3.5 text-left w-48 font-semibold">
                                                            Date Submitted
                                                        </th>
                                                        <th className="px-3 py-3.5 text-left w-32 font-semibold">
                                                            Route Assigned
                                                        </th>
                                                        <th className="px-3 py-3.5 text-left font-semibold">
                                                            Route Name
                                                        </th>
                                                        <th className="px-3 py-3.5 text-left w-48 font-semibold">
                                                            Route Date
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-800">
                                                    {transfers.map((transfer) => (
                                                        <tr key={transfer.id}>
                                                            <td className="whitespace-nowrap py-2 pl-4 pr-3 text-gray-200 sm:pl-3">
                                                                <div className="flex flex-row justify-start"><a
                                                                    href={`/office/transfers/${transfer.id}`}><FaArrowRightArrowLeft
                                                                    className="mr-2 p-1 rounded bg-indigo-600 text-white text-xl"/></a>{transfer.id}
                                                                </div>
                                                            </td>
                                                            <td className="whitespace-nowrap py-4 font-medium text-white">
                                                                <div className="flex justify-center text-lg">
                                                                    {transfer.status === "collected" ?
                                                                        <FaVanShuttle className="text-xl"/> :
                                                                        transfer.status === "failed" ?
                                                                            <FaTriangleExclamation
                                                                                className="text-xl"/> :
                                                                            transfer.status === "approved" ?
                                                                                <FaCheck/> :
                                                                                transfer.status === "pending" ?
                                                                                    <FaRegClock className=" "/> :
                                                                                    <FaBan/>}
                                                                </div>
                                                            </td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{transfer.date.toLocaleDateString()}</td>
                                                            <td className="whitespace-nowrap py-4 font-medium text-white">
                                                                <div className="flex justify-center text-lg">
                                                                    {transfer.routeAssigned ? <FaCheck/> : <FaXmark/>}
                                                                </div>
                                                            </td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                                                {transfer.routeAssigned ?
                                                                    <a className="text-indigo-600 hover:text-indigo-900"
                                                                       href={`/office/transfers/${transfer.route.id}`}>{transfer.route.name
                                                                        + "-" + transfer.route.id}</a> : transfer.status === "denied" ?
                                                                        <div className="flex flex-row justify-start">
                                                                            <FaTriangleExclamation
                                                                                className="mt-0.5 mr-2 text-lg"/> {transfer.reason}
                                                                        </div> : ""}
                                                            </td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{transfer.routeAssigned ? transfer.route.date.toLocaleDateString() : ""}</td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                }</Fragment>
                        ))}
                    </Fragment>
                ))}
                </tbody>
            </table>
        </div>
    );
}