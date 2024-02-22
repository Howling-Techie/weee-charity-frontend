import {FaChevronLeft, FaChevronRight} from "react-icons/fa6";

export const Header = ({path, title}) => {
    return (
        <div>
            <div>
                <nav className="sm:hidden" aria-label="Back">
                    <a href={path[Math.max(path.length - 2, 0)].link}
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
                                <a href={path[0].link}
                                   className="text-sm font-medium text-neutral-400 hover:text-neutral-200">
                                    {path[0].title}
                                </a>
                            </div>
                        </li>
                        {path.slice(1).map(page => (
                            <li>
                                <div className="flex items-center">
                                    <FaChevronRight className="h-3 w-3 flex-shrink-0 text-neutral-500"
                                                    aria-hidden="true"/>
                                    <a href={page.link} aria-current="page"
                                       className="ml-4 text-sm font-medium text-neutral-400 hover:text-neutral-200">
                                        {page.title}
                                    </a>
                                </div>
                            </li>
                        ))}
                    </ol>
                </nav>
            </div>
            <div className="mt-2 mb-4 md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
                        {title}
                    </h2>
                </div>
            </div>
        </div>
    )
}