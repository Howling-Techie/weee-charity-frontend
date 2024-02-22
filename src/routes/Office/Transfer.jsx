import {Container} from "../../components/Container.jsx";
import {useParams} from "react-router-dom";
import {Header} from "../../components/Header.jsx";
import {ItemTable} from "../../components/ItemTable.jsx";

export const Transfer = () => {
    const transferId = useParams().transferId;
    const testTransfers =
        [
            {
                "id": 1,
                "reference_number": "TRF001",
                "client": {
                    "id": 1,
                    "name": "AlphaTech Ltd",
                    "is_business": true,
                    "email": "alpha@example.com",
                    "phone": "+44 20 1234 5678"
                },
                "address": {
                    "first_line": "123 High Street",
                    "second_line": "",
                    "city": "London",
                    "county": "Greater London",
                    "postcode": "SW1A 1AA"
                },
                "submission_date": "2024-02-20",
                "status": "collected",
                "route_assigned": true,
                "route": {
                    "id": 1,
                    "name": "Southern England",
                    "date": "2024-02-25"
                }
            },
            {
                "id": 2,
                "reference_number": "TRF002",
                "client": {
                    "id": 2,
                    "name": "John Doe",
                    "is_business": false,
                    "email": "john@example.com",
                    "phone": "+44 20 2345 6789"
                },
                "address": {
                    "first_line": "456 Main Street",
                    "second_line": "",
                    "city": "Manchester",
                    "county": "Greater Manchester",
                    "postcode": "M1 1AA"
                },
                "submission_date": "2024-02-21",
                "status": "denied",
                "route_assigned": false,
                "reason_denied": "Unable to locate recipient at the provided address."
            },
            {
                "id": 3,
                "reference_number": "TRF003",
                "client": {
                    "id": 3,
                    "name": "BetaTech Solutions",
                    "is_business": true,
                    "email": "beta@example.com",
                    "phone": "+44 20 3456 7890"
                },
                "address": {
                    "first_line": "789 Elm Street",
                    "second_line": "",
                    "city": "Birmingham",
                    "county": "West Midlands",
                    "postcode": "B1 1AA"
                },
                "submission_date": "2024-02-22",
                "status": "approved",
                "route_assigned": true,
                "route": {
                    "id": 2,
                    "name": "Central England",
                    "date": "2024-03-05"
                }
            },
            {
                "id": 4,
                "reference_number": "TRF004",
                "client": {
                    "id": 4,
                    "name": "Jane Smith",
                    "is_business": false,
                    "email": "jane@example.com",
                    "phone": "+44 20 4567 8901"
                },
                "address": {
                    "first_line": "101 Oak Avenue",
                    "second_line": "",
                    "city": "Glasgow",
                    "county": "Glasgow",
                    "postcode": "G1 1AA"
                },
                "submission_date": "2024-02-23",
                "status": "denied",
                "reason_denied": "Unable to collect whitegoods."
            },
            {
                "id": 5,
                "reference_number": "TRF005",
                "client": {
                    "id": 5,
                    "name": "CharlieTech Ltd",
                    "is_business": true,
                    "email": "charlie@example.com",
                    "phone": "+44 20 5678 9012"
                },
                "address": {
                    "first_line": "321 Maple Drive",
                    "second_line": "",
                    "city": "Bristol",
                    "county": "Bristol",
                    "postcode": "BS1 1AA"
                },
                "submission_date": "2024-02-24",
                "status": "pending",
                "route_assigned": false
            },
            {
                "id": 6,
                "reference_number": "TRF006",
                "client": {
                    "id": 6,
                    "name": "Emily Johnson",
                    "is_business": false,
                    "email": "emily@example.com",
                    "phone": "+44 20 6789 0123"
                },
                "address": {
                    "first_line": "456 Cedar Lane",
                    "second_line": "",
                    "city": "Cardiff",
                    "county": "Cardiff",
                    "postcode": "CF1 1AA"
                },
                "submission_date": "2024-02-25",
                "status": "approved",
                "route_assigned": true,
                "route": {
                    "id": 3,
                    "name": "Wales",
                    "date": "2024-03-10"
                }
            },
            {
                "id": 7,
                "reference_number": "TRF007",
                "client": {
                    "id": 7,
                    "name": "DeltaTech Solutions",
                    "is_business": true,
                    "email": "delta@example.com",
                    "phone": "+44 20 7890 1234"
                },
                "address": {
                    "first_line": "789 Pine Street",
                    "second_line": "",
                    "city": "Liverpool",
                    "county": "Merseyside",
                    "postcode": "L1 1AA"
                },
                "submission_date": "2024-02-26",
                "status": "approved",
                "route_assigned": true,
                "route": {
                    "id": 4,
                    "name": "Northwest England",
                    "date": "2024-03-15"
                }
            },
            {
                "id": 8,
                "reference_number": "TRF008",
                "client": {
                    "id": 8,
                    "name": "Grace Johnson",
                    "is_business": false,
                    "email": "grace@example.com",
                    "phone": "+44 20 8901 2345"
                },
                "address": {
                    "first_line": "101 Birch Street",
                    "second_line": "",
                    "city": "Edinburgh",
                    "county": "Edinburgh",
                    "postcode": "EH1 1AA"
                },
                "submission_date": "2024-02-27",
                "status": "pending",
                "route_assigned": false
            },
            {
                "id": 9,
                "reference_number": "TRF009",
                "client": {
                    "id": 9,
                    "name": "FoxtrotTech Ltd",
                    "is_business": true,
                    "email": "foxtrot@example.com",
                    "phone": "+44 20 9012 3456"
                },
                "address": {
                    "first_line": "321 Elm Street",
                    "second_line": "",
                    "city": "Leicester",
                    "county": "Leicestershire",
                    "postcode": "LE1 1AA"
                },
                "submission_date": "2024-02-28",
                "status": "failed",
                "route_assigned": true,
                "route": {
                    "id": 5,
                    "name": "Midlands",
                    "date": "2024-03-20"
                },
                "reason_failed": "Failed to pick up due to vehicle breakdown."
            },
            {
                "id": 10,
                "reference_number": "TRF010",
                "client": {
                    "id": 10,
                    "name": "Heather Brown",
                    "is_business": false,
                    "email": "heather@example.com",
                    "phone": "+44 20 3456 7890"
                },
                "address": {
                    "first_line": "456 Birch Lane",
                    "second_line": "",
                    "city": "Southampton",
                    "county": "Hampshire",
                    "postcode": "SO1 1AA"
                },
                "submission_date": "2024-03-01",
                "status": "approved",
                "route_assigned": true,
                "route": {
                    "id": 6,
                    "name": "Southern England",
                    "date": "2024-03-25"
                }
            }
        ]
    const testItems = [
        {
            "id": 1,
            "reference_number": "TRF001",
            "name": "Freezer",
            "original_name": "Server",
            "note": "Do not collect whitegoods.",
            "status": "rejected",
            "requires_wiping": true,
            "date_processed": "2024-02-20"
        },
        {
            "id": 2,
            "reference_number": "TRF002",
            "name": "Hard Drive",
            "original_name": null,
            "note": "",
            "status": "processed",
            "requires_wiping": true,
            "date_processed": "2024-02-21"
        },
        {
            "id": 3,
            "reference_number": "TRF003",
            "original_name": "Monitor",
            "name": "All-in-One PC",
            "note": "Mislabelled during collection.",
            "status": "collected",
            "requires_wiping": true,
            "date_processed": null
        },
        {
            "id": 4,
            "reference_number": "TRF004",
            "name": "Keyboard",
            "original_name": null,
            "note": "",
            "status": "collected",
            "requires_wiping": false,
            "date_processed": null
        },
        {
            "id": 5,
            "reference_number": "TRF005",
            "name": "Mouse",
            "original_name": null,
            "note": "",
            "status": "collected",
            "requires_wiping": false,
            "date_processed": null
        },
        {
            "id": 6,
            "reference_number": "TRF006",
            "name": "Printer",
            "original_name": null,
            "note": "",
            "status": "processed",
            "requires_wiping": false,
            "date_processed": "2024-02-22"
        },
        {
            "id": 7,
            "reference_number": "TRF007",
            "name": "Scanner",
            "original_name": null,
            "note": "",
            "status": "collected",
            "requires_wiping": false,
            "date_processed": null
        },
        {
            "id": 8,
            "reference_number": "TRF008",
            "original_name": "Power Bank",
            "name": "External Hard Drive",
            "note": "Mislabeled during collection.",
            "status": "processed",
            "requires_wiping": true,
            "date_processed": "2024-02-23"
        },
        {
            "id": 9,
            "reference_number": "TRF009",
            "name": "Hard Drive",
            "original_name": null,
            "note": "",
            "status": "processed",
            "requires_wiping": true,
            "date_processed": "2024-02-24"
        },
        {
            "id": 10,
            "reference_number": "TRF010",
            "name": "Laptop",
            "original_name": null,
            "note": "",
            "status": "collected",
            "requires_wiping": true,
            "date_processed": null
        },
        {
            "id": 11,
            "reference_number": "TRF011",
            "name": "Mouse",
            "original_name": null,
            "note": "",
            "status": "collected",
            "requires_wiping": false,
            "date_processed": null
        },
        {
            "id": 12,
            "reference_number": "TRF012",
            "name": "Monitor",
            "original_name": null,
            "note": "",
            "status": "processed",
            "requires_wiping": false,
            "date_processed": "2024-02-26"
        },
        {
            "id": 13,
            "reference_number": "TRF013",
            "original_name": "Hard Drive",
            "name": "SSD",
            "note": "Mislabeled during collection.",
            "status": "processed",
            "requires_wiping": true,
            "date_processed": "2024-02-27"
        },
        {
            "id": 14,
            "reference_number": "TRF014",
            "name": "Keyboard",
            "original_name": null,
            "note": "",
            "status": "collected",
            "requires_wiping": false,
            "date_processed": null
        },
        {
            "id": 15,
            "reference_number": "TRF015",
            "name": "Laptop",
            "original_name": null,
            "note": "",
            "status": "processed",
            "requires_wiping": true,
            "date_processed": "2024-02-28"
        },
        {
            "id": 16,
            "reference_number": "TRF016",
            "name": "Mouse",
            "original_name": null,
            "note": "",
            "status": "collected",
            "requires_wiping": false,
            "date_processed": null
        },
        {
            "id": 17,
            "reference_number": "TRF017",
            "name": "Hard Drive",
            "original_name": null,
            "note": "",
            "status": "processed",
            "requires_wiping": true,
            "date_processed": "2024-02-29"
        },
        {
            "id": 18,
            "reference_number": "TRF018",
            "name": "Printer",
            "original_name": null,
            "note": "",
            "status": "collected",
            "requires_wiping": false,
            "date_processed": null
        },
        {
            "id": 19,
            "reference_number": "TRF019",
            "name": "Power Bank",
            "original_name": null,
            "note": "",
            "status": "awaiting collection",
            "requires_wiping": false,
            "date_processed": "2024-02-29"
        },
        {
            "id": 20,
            "reference_number": "TRF020",
            "name": "Hard Drive",
            "original_name": null,
            "note": "",
            "status": "collected",
            "requires_wiping": true,
            "date_processed": null
        }
    ];

    if (Number.isNaN(transferId) || testTransfers.length < Number.parseInt(transferId) || Number.parseInt(transferId) < 0) {
        return <Container>Transfer not found</Container>;
    }
    const transfer = testTransfers[Number.parseInt(transferId)];

    //                 "id": 1,
    //                 "reference_number": "TRF001",
    //                 "client":
    //                     "id": 1,
    //                     "name": "AlphaTech Ltd",
    //                     "is_business": true,
    //                     "email": "alpha@example.com",
    //                     "phone": "+44 20 1234 5678"
    //                 "address":
    //                     "first_line": "123 High Street",
    //                     "second_line": "",
    //                     "city": "London",
    //                     "county": "Greater London",
    //                     "postcode": "SW1A 1AA"
    //                 "submission_date": "2024-02-20",
    //                 "status": "collected",
    //                 "route_assigned": true,
    //                 "route":
    //                     "id": 1,
    //                     "name": "Southern England",
    //                     "date": "2024-02-25"

    return (
        <Container>
            <Header path={[{link: "/office", title: "Back Office"},
                {link: "/office/transfers", title: "Transfers"},
                {link: `/office/transfers/${transfer.id}`, title: `#${transfer.reference_number}`}]}
                    title={transfer.client.name}/>
            <div className="flex w-full space-y-3 md:space-y-0 md:space-x-3 flex-col md:flex-row">
                <div className="w-full md:w-2/3 flex flex-col space-y-2">
                    <div className="rounded bg-neutral-800 p-14 divide-neutral-500 divide-y">
                        <div className="font-semibold pb-8">
                        <span
                            className="text-neutral-400 font-display">Submitted on </span>{new Date(transfer.submission_date).toDateString()}
                        </div>
                        <div className="py-8 grid grid-cols-2 gap-4">
                            {/*Transfer Info*/}
                            <div>
                                <p className="font-semibold pb-3">Client</p>
                                <p>{transfer.client.name}</p>
                                <p>{transfer.client.email}</p>
                                <p>{transfer.client.phone}</p>
                            </div>
                            <div>
                                <p className="font-semibold pb-3">Transfer Details</p>
                                <p>{transfer.address.first_line}</p>
                                <p>{transfer.address.second_line}</p>
                                <p>{transfer.address.city}</p>
                                <p>{transfer.address.county}</p>
                                <p>{transfer.address.postcode}</p>
                            </div>
                        </div>
                        <div className="py-8">
                            <ItemTable items={testItems}/>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/3 flex flex-col space-y-2">
                    <div className="rounded bg-neutral-800 h-96"></div>
                </div>
            </div>
        </Container>
    )
}