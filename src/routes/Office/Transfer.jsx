import {Container} from "../../components/Container.jsx";
import {useParams} from "react-router-dom";
import {Header} from "../../components/Header.jsx";
import {ItemTable} from "../../components/ItemTable.jsx";
import {FaBan, FaCheck, FaRegClock, FaTriangleExclamation, FaVanShuttle} from "react-icons/fa6";
import testTransfers from "../../test data/transfers.json";
import testItems from "../../test data/items.json";
import testClients from "../../test data/clients.json";
import testRoutes from "../../test data/routes.json";

export const Transfer = () => {
    const transferId = useParams().transferId;

    if (Number.isNaN(transferId) || testTransfers.length < Number.parseInt(transferId) || Number.parseInt(transferId) < 0) {
        return <Container>Transfer not found</Container>;
    }
    const transfer = testTransfers.find(t => t.id === Number.parseInt(transferId));
    transfer.items = testItems.filter(item => item.transfer_id === transfer.id);
    transfer.client = testClients.find(client => client.id === transfer.client_id);
    transfer.route = testRoutes.find(route => route.id === transfer.route_id)

    return (
        <Container>
            <Header path={[{link: "/office", title: "Back Office"},
                {link: "/office/transfers", title: "Transfers"},
                {link: `/office/transfers/${transfer.id}`, title: `#${transfer.reference}`}]}
                    title={transfer.client.name}/>
            <div className="flex w-full space-y-3 md:space-y-0 md:space-x-3 flex-col md:flex-row">
                <div className="w-full md:w-2/3 flex flex-col space-y-2">
                    <div className="rounded bg-neutral-800 p-14 divide-neutral-500 divide-y">
                        <div className="font-semibold pb-8">
                            <p><span
                                className="text-neutral-400 font-display">Submitted on </span>{new Date(transfer.submission_date).toDateString()}
                            </p>
                            <p><span
                                className="text-neutral-400 font-display">Status: </span>{transfer.status}</p>
                            {transfer.reason && <p><span
                                className="text-neutral-400 font-display">Reason: </span>{transfer.reason}</p>}
                        </div>
                        <div className="py-8 grid grid-cols-2 gap-4">
                            {/*Transfer Info*/}
                            <div>
                                <h2 className="font-semibold pb-3">Client</h2>
                                <p>{transfer.client.name}</p>
                                <p>{transfer.client.email}</p>
                                <p>{transfer.client.contact_number}</p>
                            </div>
                            <div>
                                <h2 className="font-semibold pb-3">Transfer Details</h2>
                                {transfer.use_client_address ?
                                    <>
                                        <p>{transfer.client.address.first_line}</p>
                                        <p>{transfer.client.address.city}</p>
                                        <p>{transfer.client.address.county}</p>
                                        <p>{transfer.client.address.postcode}</p>
                                    </> :
                                    <>
                                        <p>{transfer.address.first_line}</p>
                                        <p>{transfer.address.city}</p>
                                        <p>{transfer.address.county}</p>
                                        <p>{transfer.address.postcode}</p>
                                    </>}
                            </div>
                        </div>
                        <div className="py-8">
                            <h1 className="text-2xl my-3 font-semibold">Items</h1>
                            <ItemTable items={transfer.items}/>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/3 flex flex-col space-y-2">
                    {transfer.route && <div className="rounded bg-neutral-800 p-6">
                        <h2 className="text-neutral-400 text-sm">Route #{transfer.route.id}</h2>
                        <h1 className="text-xl">{transfer.route.name}</h1>
                        <div
                            className="flex flex-row mt-3">{transfer.status === "collected" ?
                            <FaVanShuttle className="mt-1 -mb-1 mr-1"/> :
                            transfer.status === "failed" ? <FaTriangleExclamation className="mt-1 -mb-1 mr-1"/> :
                                transfer.status === "approved" ? <FaCheck className="mt-1 -mb-1 mr-1"/> :
                                    transfer.status === "pending" ?
                                        <FaRegClock className="mt-1 -mb-1 mr-1"/> :
                                        <FaBan
                                            className="mt-1 -mb-1 mr-1"/>} {transfer.status.at(0).toUpperCase() + transfer.status.slice(1)}</div>
                        {transfer.route && <p className="mt-3">Date of Collection: {transfer.route.date}</p>}
                    </div>
                    }
                </div>
            </div>
        </Container>
    )
}