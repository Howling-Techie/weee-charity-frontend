import {FaTruck, FaClockRotateLeft, FaMagnifyingGlass} from "react-icons/fa6";
import {LuArrowLeftRight} from "react-icons/lu";
import {Container} from "../../components/Container.jsx";
import {Header} from "../../components/Header.jsx";

const links = [
    {name: 'Recently Received', icon: FaTruck, href: '/processing/received', bgColor: 'bg-pink-600'},
    {name: 'Recently Updated', icon: FaClockRotateLeft, href: '/processing/updated', bgColor: 'bg-purple-600'},
    {name: 'Search by Transfer', icon: LuArrowLeftRight, href: '/processing/transfers', bgColor: 'bg-yellow-500'},
    {name: 'Search by Item', icon: FaMagnifyingGlass, href: '/processing/items', bgColor: 'bg-green-500'},
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const Processing = () => {
    return (
        <Container>
            <Header title="Processing" path={[{link: "/processing", title: "Processing"}]}/>
            <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
                {links.map((link) => {
                    const CustomIcon = link.icon;
                    return (
                        <li key={link.name}
                            className="flex rounded-md border border-neutral-600 hover:border-neutral-200">
                            <a href={link.href} className="flex w-full">
                                <div
                                    className={classNames(
                                        link.bgColor,
                                        'flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-white'
                                    )}
                                >
                                    <CustomIcon/>
                                </div>
                                <div
                                    className="flex flex-1 px-4 py-2 text-sm font-medium text-neutral-900 rounded-r-md bg-white">
                                    {link.name}
                                </div>
                            </a>
                        </li>
                    )
                })}
            </ul>
        </Container>
    )
}