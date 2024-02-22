export const CardWithIcon = ({icon, title, text, link, linkText}) => {
    return (
        <div
            className="relative overflow-hidden rounded-lg bg-neutral-800 pb-12 pt-5 px-3 sm:pt-6"
        >
            <dt>
                <div className="absolute rounded-md bg-indigo-500 p-3">
                    <icon.type className="h-6 w-6 text-white" aria-hidden="true"/>
                </div>
                <p className="ml-16 truncate text-sm font-medium text-neutral-400">{title}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                <p className="text-2xl font-semibold text-white">{text}</p>
                <div className="absolute inset-x-0 bottom-0 bg-neutral-600 px-4 py-4 sm:px-6">
                    <div className="text-sm">
                        <a href={link} className="font-medium text-neutral-200 hover:text-indigo-500">
                            {linkText}
                        </a>
                    </div>
                </div>
            </dd>
        </div>
    )
}