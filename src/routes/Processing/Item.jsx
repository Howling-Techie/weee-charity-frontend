import {Container} from "../../components/Container.jsx";
import {Header} from "../../components/Header.jsx";
import {FaBan, FaCheck, FaRegClock, FaTriangleExclamation, FaVanShuttle} from "react-icons/fa6";
import {useParams} from "react-router-dom";
import {ItemNotes} from "../../components/ItemNotes.jsx";

const testItems = [
    {
        "id": 1,
        "reference_number": "REF001",
        "name": "Hard Drive",
        "original_name": "Power Bank",
        "transfer": {
            "id": 101,
            "reference_number": "TRANS101",
            "name": "Transfer Station A",
            "collection_date": "2024-02-27"
        },
        "status": "collected",
        "requires_wiping": true,
        "notes": [
            {
                "date_added": "2024-02-27",
                "added_by": "Admin",
                "note": "Item collected."
            }
        ],
        "date_processed": null
    },
    {
        "id": 2,
        "reference_number": "REF002",
        "name": "Mouse",
        "original_name": null,
        "transfer": {
            "id": 102,
            "reference_number": "TRANS102",
            "name": "Transfer Station B",
            "collection_date": "2024-02-28"
        },
        "status": "processed",
        "requires_wiping": false,
        "notes": [
            {
                "date_added": "2024-02-24",
                "added_by": "Admin",
                "note": "Item approved."
            },
            {
                "date_added": "2024-02-28",
                "added_by": "Admin",
                "note": "Item collected."
            },
            {
                "date_added": "2024-02-28",
                "added_by": "Admin",
                "note": "Item processed."
            }
        ],
        "date_processed": "2024-02-28"
    },
    {
        "id": 3,
        "reference_number": "REF003",
        "name": "Monitor",
        "original_name": null,
        "transfer": {
            "id": 103,
            "reference_number": "TRANS103",
            "name": "Transfer Station C",
            "collection_date": "2024-03-01"
        },
        "status": "approved",
        "requires_wiping": false,
        "notes": [
            {
                "date_added": "2024-03-01",
                "added_by": "Admin",
                "note": "Item approved."
            }
        ],
        "date_processed": null
    },
    {
        "id": 4,
        "reference_number": "REF004",
        "name": "Coolbox",
        "original_name": null,
        "transfer": {
            "id": 104,
            "reference_number": "TRANS104",
            "name": "Transfer Station D",
            "collection_date": "2024-03-02"
        },
        "status": "denied",
        "requires_wiping": false,
        "notes": [
            {
                "date_added": "2024-03-02",
                "added_by": "Admin",
                "note": "Item denied, do not collect white goods."
            }
        ],
        "date_processed": null
    },
    {
        "id": 5,
        "reference_number": "REF005",
        "name": "Hard Drive",
        "original_name": null,
        "transfer": {
            "id": 105,
            "reference_number": "TRANS105",
            "name": "Transfer Station E",
            "collection_date": "2024-03-03"
        },
        "status": "skipped",
        "requires_wiping": true,
        "notes": [
            {
                "date_added": "2024-03-03",
                "added_by": "Admin",
                "note": "Item skipped, item not present at collection."
            }
        ],
        "date_processed": null
    },
    {
        "id": 6,
        "reference_number": "REF006",
        "name": "Mouse",
        "original_name": null,
        "transfer": {
            "id": 106,
            "reference_number": "TRANS106",
            "name": "Transfer Station F",
            "collection_date": "2024-03-04"
        },
        "status": "collected",
        "requires_wiping": false,
        "notes": [
            {
                "date_added": "2024-03-02",
                "added_by": "Admin",
                "note": "Item approved."
            },
            {
                "date_added": "2024-03-04",
                "added_by": "Admin",
                "note": "Item collected."
            }
        ],
        "date_processed": null
    },
    {
        "id": 7,
        "reference_number": "REF007",
        "name": "Monitor",
        "original_name": null,
        "transfer": {
            "id": 107,
            "reference_number": "TRANS107",
            "name": "Transfer Station G",
            "collection_date": "2024-03-05"
        },
        "status": "processed",
        "requires_wiping": false,
        "notes": [
            {
                "date_added": "2024-03-05",
                "added_by": "Admin",
                "note": "Item collected."
            },
            {
                "date_added": "2024-03-06",
                "added_by": "Admin",
                "note": "Item processed."
            }
        ],
        "date_processed": "2024-03-06"
    },
    {
        "id": 8,
        "reference_number": "REF008",
        "name": "Tablet",
        "original_name": null,
        "transfer": {
            "id": 108,
            "reference_number": "TRANS108",
            "name": "Transfer Station H",
            "collection_date": "2024-03-06"
        },
        "status": "collected",
        "requires_wiping": false,
        "notes": [
            {
                "date_added": "2024-03-06",
                "added_by": "Admin",
                "note": "Item collected."
            }
        ],
        "date_processed": null
    },
    {
        "id": 9,
        "reference_number": "REF009",
        "name": "Hard Drive",
        "original_name": null,
        "transfer": {
            "id": 109,
            "reference_number": "TRANS109",
            "name": "Transfer Station I",
            "collection_date": "2024-03-07"
        },
        "status": "processed",
        "requires_wiping": true,
        "notes": [
            {
                "date_added": "2024-03-07",
                "added_by": "Admin",
                "note": "Item processed."
            },
            {
                "date_added": "2024-03-07",
                "added_by": "Admin",
                "note": "Data wiped."
            }
        ],
        "date_processed": "2024-03-07"
    },
    {
        "id": 10,
        "reference_number": "REF010",
        "name": "Mouse",
        "original_name": null,
        "transfer": {
            "id": 110,
            "reference_number": "TRANS110",
            "name": "Transfer Station J",
            "collection_date": "2024-03-08"
        },
        "status": "processed",
        "requires_wiping": true,
        "notes": [
            {
                "date_added": "2024-03-08",
                "added_by": "Admin",
                "note": "Item processed."
            },
            {
                "date_added": "2024-03-08",
                "added_by": "Admin",
                "note": "Data wiped."
            }
        ],
        "date_processed": "2024-03-08"
    }
];
export const Item = () => {
    const {transferId, itemId} = useParams();

    const item = testItems[itemid];
    const transfer = item.transfer;
    transfer.client = {
        "id": 1,
        "name": "AlphaTech Ltd",
        "is_business": true,
        "email": "alpha@example.com",
        "phone": "+44 20 1234 5678"
    };
    transfer.address = {
        "first_line": "123 High Street",
        "second_line": "",
        "city": "London",
        "county": "Greater London",
        "postcode": "SW1A 1AA"
    };
    transfer.route = {
        "id": 1,
        "name": "Southern England",
        "date": "2024-02-25"
    };
    transfer.route_assigned = true;
    transfer.status = item.status;

    return (
        <Container>
            <Header path={[{link: "/processing", title: "Processing"},
                {link: "/processing/transfers", title: "Transfers"},
                {
                    link: `/processing/transfers/${item.transfer.id}`,
                    title: `Transfer #${item.transfer.reference_number}`
                },
                {
                    link: `/processing/transfers/${item.transfer.id}/${item.id}`,
                    title: `Item #${item.reference_number}`
                }]}
                    title={item.name}/>
            <div className="flex w-full space-y-3 md:space-y-0 md:space-x-3 flex-col md:flex-row">
                <div className="w-full md:w-2/3 flex flex-col space-y-2">
                    <div className="rounded bg-neutral-800 p-14 divide-neutral-500 divide-y">
                        <div className="font-semibold pb-8">
                        <span
                            className="text-neutral-400 font-display">Received on </span>{new Date(2024, 1, 23).toDateString()}
                        </div>
                        <div className="font-semibold pt-8">
                        <span
                            className="text-neutral-400 font-display">Status: </span>{item.status}
                            <div className="pt-4 flex space-x-2">
                                {item.status === "approved" ? <>
                                    <button
                                        type="button"
                                        className="rounded-md bg-indigo-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                    >
                                        Mark as Collected
                                    </button>
                                    <button
                                        type="button"
                                        disabled
                                        className="rounded-md bg-neutral-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                    >
                                        Mark as Processed
                                    </button>
                                </> : item.status === "collected" ? <>
                                    <button
                                        type="button"
                                        className="rounded-md bg-red-700 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                    >
                                        Mark as Uncollected
                                    </button>

                                    <button
                                        type="button"
                                        className="rounded-md bg-indigo-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                    >
                                        Mark as Processed
                                    </button>
                                </> : item.status === "processed" ? <>
                                    <button
                                        type="button"
                                        className="rounded-md bg-red-700 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                    >
                                        Mark as Uncollected
                                    </button>
                                    <button
                                        type="button"
                                        className="rounded-md bg-red-700 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                    >
                                        Mark as Unprocessed
                                    </button>
                                </> : <>
                                    <button
                                        type="button"
                                        disabled
                                        className="rounded-md bg-neutral-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                    >
                                        Mark as Collected
                                    </button>
                                    <button
                                        type="button"
                                        disabled
                                        className="rounded-md bg-neutral-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                    >
                                        Mark as Processed
                                    </button>
                                </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/3 flex flex-col space-y-2">
                    <div className="rounded bg-neutral-800 p-6">
                        <h2 className="text-neutral-400 text-sm">Route #{transfer.route.id}</h2>
                        <h1 className="text-xl">{transfer.route.name}</h1>
                        {transfer.route && <p className="mt-3 text-sm">Date of Collection: {transfer.route.date}</p>}
                    </div>
                    <div className="rounded bg-neutral-800 p-6">
                        <h2 className="text-neutral-400 text-sm">Transfer #{transfer.reference_number}</h2>
                        <h1 className="text-xl">{transfer.name}</h1>
                        <div
                            className="flex flex-row mt-3 text-sm">{transfer.status === "collected" ?
                            <FaVanShuttle className="mt-1 -mb-1 mr-1"/> :
                            transfer.status === "failed" ? <FaTriangleExclamation className="mt-1 -mb-1 mr-1"/> :
                                transfer.status === "processed" ? <FaCheck className="mt-1 -mb-1 mr-1"/> :
                                    transfer.status === "pending" ?
                                        <FaRegClock className="mt-1 -mb-1 mr-1"/> :
                                        <FaBan
                                            className="mt-1 -mb-1 mr-1"/>} {transfer.status.at(0).toUpperCase() + transfer.status.slice(1)}</div>
                    </div>

                    <div className="rounded bg-neutral-800 p-6">
                        <ItemNotes notes={item.notes}/>
                    </div>
                </div>
            </div>
        </Container>
    )
}