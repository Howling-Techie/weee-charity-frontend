import PropTypes from 'prop-types';
import {FaBan, FaCheck, FaPen, FaRegClock, FaVanShuttle} from "react-icons/fa6";

export const ItemTable = ({items}) => {
    const itemGroups = [...new Set(items.map(item => item.name).sort())]
    return (
        <>
            <table className="w-full whitespace-nowrap text-left leading-6">
                <thead className="border-b border-neutral-500">
                <tr>
                    <th className="px-0 py-3 font-semibold">
                        Name
                    </th>
                    <th className="py-3 pl-8 pr-0 text-right font-semibold">
                        Reference
                    </th>
                    <th className="py-3 pl-8 pr-0 text-right font-semibold">
                        Quantity
                    </th>
                    <th className="py-3 pl-4 text-center w-8 font-semibold">
                        Status
                    </th>
                </tr>
                </thead>
                <tbody>
                {itemGroups.map((group, groupIdx) => {
                        const filteredItems = items.filter(item => item.name === group);
                        const item = filteredItems[0];
                        if (filteredItems.length === 1) {
                            return (
                                <tr key={groupIdx} className="border-b border-neutral-700">
                                    <td className="py-5 align-top">
                                        {item.original_name &&
                                            <div
                                                className="text-neutral-400 line-through text-sm">{item.original_name}</div>}
                                        <div className="flex flex-row"><a
                                            href={`/office/items/${item.name}`}><FaPen
                                            className="mr-2 p-1 rounded bg-indigo-600 text-white text-xl"/></a>
                                            <div className="font-medium">{item.name}</div>
                                        </div>
                                        {item.note && <div className="text-neutral-400 text-sm">{item.note}</div>}
                                    </td>
                                    <td className="py-5 pl-8 pr-0 text-right">
                                        #{item.reference_number}
                                    </td>
                                    <td className="py-5 pl-8 pr-0 text-right tabular-nums">
                                        1
                                    </td>
                                    <td className="py-5 pl-4 text-center">{
                                        item.status === "awaiting collection" ? <FaRegClock className="w-full text-lg"/>
                                            : item.status === "collected" ? <FaVanShuttle className="w-full text-lg"/>
                                                : item.status === "rejected" ? <FaBan className="w-full text-lg"/> :
                                                    <FaCheck className="w-full text-lg"/>
                                    }</td>
                                </tr>
                            )
                        } else {
                            return (
                                <>
                                    <tr key={groupIdx} className="border-b border-neutral-700">
                                        <td className="max-w-0 px-0 py-5 align-top">
                                            <div className="font-medium">{item.name}</div>
                                        </td>
                                        <td className="py-5 pl-8 pr-0 text-right">
                                            -
                                        </td>
                                        <td className="py-5 pl-8 pr-0 text-right tabular-nums">
                                            {filteredItems.length}
                                        </td>
                                        <td className="py-5 pl-4 text-center">{
                                            filteredItems.some(i => i.status === "awaiting collection") ?
                                                <FaRegClock className="w-full text-lg"/>
                                                : filteredItems.some(i => i.status === "rejected") ?
                                                    <FaBan className="w-full text-lg"/>
                                                    : filteredItems.some(i => i.status === "collected") ?
                                                        <FaVanShuttle className="w-full text-lg"/>
                                                        : <FaCheck className="w-full text-lg"/>
                                        }</td>
                                    </tr>
                                    <tr key={groupIdx} className="border-b border-neutral-700">
                                        <td className="" colSpan={4}>
                                            <div className="mx-3 bg-neutral-900 px-2 rounded overflow-clip">
                                                <table
                                                    className="min-w-full">
                                                    <thead className="border-b border-neutral-500">
                                                    <tr>
                                                        <th className="px-0 py-3 font-semibold">
                                                            Name
                                                        </th>
                                                        <th className="py-3 pl-8 pr-0 text-right font-semibold">
                                                            Reference
                                                        </th>
                                                        <th className="py-3 px-4 pr-0 text-center w-8 font-semibold">
                                                            Status
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {filteredItems.map((item, itemIdx) => {
                                                        return (
                                                            <tr key={itemIdx}>
                                                                <td className="py-2 align-middle">
                                                                    {item.original_name &&
                                                                        <div
                                                                            className="text-neutral-400 line-through text-sm">{item.original_name}</div>}
                                                                    <div className="flex flex-row "><a
                                                                        href={`/office/items/${item.name}`}><FaPen
                                                                        className="mr-2 p-1 rounded bg-indigo-600 text-white text-xl"/></a>
                                                                        <div className="font-medium">{item.name}</div>
                                                                    </div>
                                                                    {item.note && <div
                                                                        className="text-neutral-400 text-sm">{item.note}</div>}
                                                                </td>
                                                                <td className="py-2 pl-8 pr-0 text-right">
                                                                    {item.reference_number}
                                                                </td>
                                                                <td className="py-5 pl-4 flex text-center justify-center">{
                                                                    item.status === "awaiting collection" ?
                                                                        <FaRegClock className="w-full text-lg"/>
                                                                        : item.status === "collected" ?
                                                                            <FaVanShuttle className="w-full text-lg"/>
                                                                            : item.status === "rejected" ?
                                                                                <FaBan className="w-full text-lg"/> :
                                                                                <FaCheck className="w-full text-lg"/>
                                                                }</td>
                                                            </tr>
                                                        )
                                                    })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                </>
                            )
                        }
                    }
                )
                }
                </tbody>
            </table>
        </>
    )
}

ItemTable.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            reference_number: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            original_name: PropTypes.string,
            note: PropTypes.string,
            status: PropTypes.string.isRequired,
            requires_wiping: PropTypes.bool.isRequired,
            date_processed: PropTypes.string,
        })
    ).isRequired,
};