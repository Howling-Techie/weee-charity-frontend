function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const ItemNotes = ({notes}) => {
    return (
        <>
            <div className="lg:col-start-3">
                {/* Activity feed */}
                <h2 className="text-sm font-semibold leading-6 text-neutral-100">Notes</h2>
                <ul role="list" className="mt-6 space-y-6">
                    {notes.map((note, noteIdx) => (
                        <li key={notes.id} className="relative flex gap-x-4">
                            <div
                                className={classNames(
                                    noteIdx === notes.length - 1 ? 'h-6' : '-bottom-6',
                                    'absolute left-0 top-0 flex w-6 justify-center'
                                )}
                            >
                                <div className="w-px bg-neutral-200"/>
                            </div>
                            <>
                                <div
                                    className="relative flex h-6 w-6 flex-none items-center justify-center bg-neutral-800">
                                    <div className="h-1.5 w-1.5 rounded-full bg-neutral-700 ring-1 ring-neutral-500"/>
                                </div>
                                <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-neutral-200">
                                    <div className="flex justify-between gap-x-4">
                                        <div className="py-0.5 text-xs leading-5 text-neutral-500">
                                                <span
                                                    className="font-medium text-neutral-100">{note.added_by}</span> commented
                                        </div>
                                        <time
                                            dateTime={note.date_added}
                                            className="flex-none py-0.5 text-xs leading-5 text-neutral-500"
                                        >
                                            {note.date_added}
                                        </time>
                                    </div>
                                    <p className="text-sm leading-6 text-neutral-300">{note.note}</p>
                                </div>
                            </>
                        </li>
                    ))}
                </ul>

                {/* New comment form */}
                <div className="mt-6 flex gap-x-3">
                    <form action="#" className="relative flex-auto">
                        <div
                            className="overflow-hidden rounded-lg pb-12 shadow-sm ring-1 ring-inset ring-neutral-300 focus-within:ring-2 focus-within:ring-indigo-600">
                            <label htmlFor="comment" className="sr-only">
                                Add your comment
                            </label>
                            <textarea
                                rows={2}
                                name="comment"
                                id="comment"
                                className="block w-full resize-none border-0 bg-transparent py-1.5 text-neutral-100 placeholder:text-neutral-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="Add your comment..."
                                defaultValue={''}
                            />
                        </div>

                        <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
                            <div className="flex items-center space-x-5">
                            </div>
                            <button
                                type="submit"
                                className="rounded-md bg-indigo-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            >
                                Comment
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}