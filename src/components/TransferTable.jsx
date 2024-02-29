import {FaRoute, FaUserTie} from "react-icons/fa";
import {
    FaArrowRightArrowLeft,
    FaBan,
    FaBriefcase,
    FaCheck,
    FaRegClock,
    FaTriangleExclamation, FaVanShuttle,
    FaXmark
} from "react-icons/fa6";
import PropTypes from "prop-types";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const TransferTable = ({transfers}) => {

    return (
        <div className="inline-block min-w-full align-middle rounded-lg overflow-clip">
            <table className="min-w-full">
                <thead className="bg-neutral-800 text-white text-sm font-semibold">
                <tr>
                    <th scope="col"
                        className="py-3.5 pl-4 pr-3 text-left sm:pl-3">
                        Reference
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left">
                        Submission Date
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left">
                        Client
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left">
                        City
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left">
                        Post Code
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-center">
                        Status
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-center">
                        Route Assigned
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left">
                        Route
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left">
                        Collection Date
                    </th>
                </tr>
                </thead>
                <tbody className="bg-neutral-800">
                {transfers.map((transfer, transferIdx) => (
                    <tr key={transfer.id}
                        className={classNames(transferIdx === 0 ? 'border-gray-700' : 'border-gray-700', 'border-t text-gray-300 text-sm')}
                    >
                        <td className="whitespace-nowrap py-2 pl-4 pr-3 text-gray-200 sm:pl-3">
                            <div className="flex flex-row justify-start"><a
                                href={`/office/transfers/${transfer.id}`}><FaArrowRightArrowLeft
                                className="mr-2 p-1 rounded bg-indigo-600 text-white text-xl"/></a>{transfer.reference_number}
                            </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-2">{new Date(transfer.submission_date).toLocaleDateString()}</td>
                        <td className="whitespace-nowrap px-3 py-2">
                            <div className="flex flex-row"><a
                                href={`/office/clients/${transfer.client.id}`}>
                                {transfer.client.is_business ?
                                    <FaBriefcase className="mr-2 p-1 rounded bg-indigo-600 text-white text-xl"/>
                                    : <FaUserTie
                                        className="mr-2 p-1 rounded bg-indigo-600 text-white text-xl"/>}</a>
                                {transfer.client.name}
                            </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-2">{transfer.use_client_address ? transfer.client.address.city : transfer.address.city}</td>
                        <td className="whitespace-nowrap px-3 py-2">{transfer.use_client_address ? transfer.client.address.postcode : transfer.address.postcode}</td>
                        <td className="whitespace-nowrap py-4 font-medium text-white">
                            <div className="flex justify-center text-lg">
                                {transfer.status === "collected" ? <FaVanShuttle className="text-xl"/> :
                                    transfer.status === "failed" ? <FaTriangleExclamation className="text-xl"/> :
                                        transfer.status === "approved" ? <FaCheck/> :
                                            transfer.status === "pending" ?
                                                <FaRegClock className=" "/> :
                                                <FaBan/>}
                            </div>
                        </td>
                        <td className="whitespace-nowrap py-4 text-lg font-medium text-white justify-center flex">
                            {transfer.route_id ? <FaCheck/> : <FaXmark/>}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                            {transfer.route_id ?
                                <div className="flex flex-row justify-start"><a
                                    href={`/office/routes/${transfer.route.id}`}><FaRoute
                                    className="mr-2 p-1 rounded bg-indigo-600 text-white text-xl"/></a>{transfer.route.name} ({transfer.route.reference})
                                </div> : transfer.status === "denied" ?
                                    <div className="flex flex-row justify-start">
                                        <FaTriangleExclamation
                                            className="mt-0.5 mr-2 text-lg"/> {transfer.reason}
                                    </div> : ""}
                        </td>
                        <td className="whitespace-nowrap px-3 py-2">{transfer.route_id && new Date(transfer.route.date).toLocaleDateString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

TransferTable.propTypes = {
    transfers: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            reference: PropTypes.string.isRequired,
            submission_date: PropTypes.string.isRequired,
            route_id: PropTypes.number.isRequired,
            status: PropTypes.string.isRequired,
            reason: PropTypes.string,
            client: PropTypes.shape({
                id: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
                is_business: PropTypes.bool.isRequired,
            }).isRequired,
            route: PropTypes.shape({
                id: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired
            }),
            collection: PropTypes.shape({
                start_date: PropTypes.string,
                end_date: PropTypes.string,
                time_collected: PropTypes.string,
                status: PropTypes.string.isRequired,
            })
        })
    ).isRequired,
};