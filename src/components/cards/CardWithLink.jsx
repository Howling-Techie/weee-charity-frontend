export const CardWithLink = ({title, children, link, linkText}) => {
    return (
        <div className="relative h-full divide-y divide-neutral-600 overflow-hidden rounded-lg bg-neutral-800">
            {title && <div className="px-4 py-3 sm:px-6">
                {title}
            </div>
            }
            <div className="p-3">{children}</div>
            <div className="px-4 py-4 sm:px-6 bg-neutral-600 bottom-0 absolute w-full">
                <div className="text-sm">
                    <a href={link} className="font-medium text-neutral-200 hover:text-indigo-500">
                        {linkText}
                    </a>
                </div>
            </div>
        </div>
    )
}