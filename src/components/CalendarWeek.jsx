import {Fragment, useEffect, useRef, useState} from 'react'
import {Menu, Transition} from '@headlessui/react'
import {FaChevronLeft, FaChevronRight} from "react-icons/fa6";
import {FaEllipsisH} from "react-icons/fa";
import {addDays, addWeeks, isSameDay, startOfWeek} from "date-fns";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const CalendarRoute = ({routeInfo}) => {
    const {transfers} = routeInfo;
    return (
        <a
            href={`/office/routes/${routeInfo.id}`}
            className="flex flex-col rounded-lg bg-neutral-100 p-2 text-xs leading-5 hover:bg-neutral-200 group-hover/transfer:bg-neutral-100 mb-2 text-neutral-800 mx-1"
        >
            <p className="font-semibold pb-1">{routeInfo.title}</p>
            <div className="grid grid-cols-1 gap-1 mx-1">
                {transfers.map(transfer => {
                    return (
                        <a key={transfer.id} href={`/office/transfers/${transfer.id}`}
                           className={classNames(
                               transfer.status === "Successful" ? 'bg-green-300 hover:bg-green-400' :
                                   (transfer.status === "En Route" ? 'bg-yellow-300 hover:bg-yellow-400' :
                                       (transfer.status === "Unsuccessful" ? 'bg-red-300 hover:bg-red-400' : 'bg-neutral-300 hover:bg-neutral-400')),
                               'rounded pl-1 group/transfer'
                           )}>
                            <p>{transfer.startTime} - {transfer.endTime}</p>
                            <p>{transfer.title}</p>
                        </a>
                    )
                })}
            </div>
        </a>)
}

export const CalendarWeek = ({startDate = new Date(), routes}) => {
    const [weekStart, setWeekStart] = useState(startOfWeek(startDate, {weekStartsOn: 1}));
    const [weekOffset, setWeekOffset] = useState(0);
    const days = Array.from({length: 5}).map((_, i) => addDays(weekStart, i));
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thur", "Fri"];
    const container = useRef(null)
    const containerNav = useRef(null)
    const containerOffset = useRef(null)

    useEffect(() => {
        // Update the dates on the calendar
        setWeekStart(startOfWeek(addWeeks(startDate, weekOffset), {weekStartsOn: 1}));
    }, [startDate, weekOffset])

    const offsetWeek = (offset) => {
        setWeekOffset(weekOffset + offset);
    }

    const resetDate = () => {
        setWeekOffset(0);
    }

    return (
        <div className="flex h-full flex-col bg-neutral-600 rounded-lg">
            <header className="flex flex-none items-center justify-between border-b border-neutral-900 px-6 py-2">
                <h1 className="text-lg text-white font-semibold leading-6">
                    <time>Week Starting {weekStart.toLocaleDateString()}</time>
                </h1>
                <div className="flex items-center">
                    <div
                        className="relative flex items-center rounded-md bg-neutral-800 text-white shadow-sm md:items-stretch">
                        <div
                            className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-inset ring-neutral-300"
                            aria-hidden="true"
                        />
                        <button
                            type="button"
                            className="flex items-center justify-center rounded-l-md py-2 pl-3 pr-4 hover:text-neutral-300 focus:relative md:w-9 md:px-2 md:hover:bg-neutral-700"
                            onClick={e => offsetWeek(-1)}
                        >
                            <span className="sr-only">Previous week</span>
                            <FaChevronLeft className="h-5 w-5" aria-hidden="true"/>
                        </button>
                        <button
                            type="button"
                            className="hidden px-3.5 text-sm font-semibold hover:bg-neutral-700 hover:text-neutral-300 focus:relative md:block"
                            onClick={e => resetDate()}
                        >
                            Today
                        </button>
                        <span className="relative -mx-px h-5 w-px bg-neutral-300 md:hidden"/>
                        <button
                            type="button"
                            className="flex items-center justify-center rounded-r-md py-2 pl-4 pr-3 hover:text-neutral-300 focus:relative md:w-9 md:px-2 md:hover:bg-neutral-700"
                            onClick={e => offsetWeek(1)}
                        >
                            <span className="sr-only">Next week</span>
                            <FaChevronRight className="h-5 w-5" aria-hidden="true"/>
                        </button>
                    </div>
                    <Menu as="div" className="relative ml-6 md:hidden">
                        <Menu.Button
                            className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-neutral-400 hover:text-neutral-500">
                            <span className="sr-only">Open menu</span>
                            <FaEllipsisH className="h-5 w-5" aria-hidden="true"/>
                        </Menu.Button>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items
                                className="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-neutral-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                    <Menu.Item>
                                        {({active}) => (
                                            <a
                                                href="office/calendar"
                                                className={classNames(
                                                    active ? 'bg-neutral-100 text-neutral-900' : 'text-neutral-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                View Full Calendar
                                            </a>
                                        )}
                                    </Menu.Item>
                                </div>
                                <div className="py-1">
                                    <Menu.Item>
                                        {({active}) => (
                                            <a
                                                href="#"
                                                className={classNames(
                                                    active ? 'bg-neutral-100 text-neutral-900' : 'text-neutral-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                Go to today
                                            </a>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </header>
            <div ref={container} className="isolate flex flex-auto flex-col overflow-auto bg-neutral-600">
                <div style={{width: '165%'}} className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full">
                    <div
                        ref={containerNav}
                        className="sticky top-0 z-30 flex-none bg-neutral-800 shadow ring-1 ring-black ring-opacity-5 sm:pr-1"
                    >
                        <div className="grid grid-cols-5 text-sm leading-6 text-white sm:hidden">
                            {days.map((day, dayIdx) => {
                                if (isSameDay(day, new Date())) {
                                    return (
                                        <button key={dayIdx} type="button"
                                                className="flex flex-col items-center pb-3 pt-2">
                                            {daysOfWeek[dayIdx].at(0)}{' '}
                                            <span
                                                className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">
                  {day.getDate()}
                </span>
                                        </button>
                                    )
                                }
                                return (
                                    <button key={dayIdx} type="button" className="flex flex-col items-center pb-3 pt-2">
                                        {daysOfWeek[dayIdx].at(0)} <span
                                        className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-neutral-900">{day.getDate()}</span>
                                    </button>
                                )
                            })}
                        </div>

                        <div
                            className="-mr-px hidden grid-cols-5 divide-x divide-neutral-600 border-r border-neutral-600 text-neutral-100 text-sm leading-6 sm:grid">
                            {days.map((day, dayIdx) => {
                                if (isSameDay(day, new Date())) {
                                    return (
                                        <div key={dayIdx} className="flex items-center justify-center py-3">
                <span className="flex items-baseline">
                  {daysOfWeek[dayIdx]}{' '}
                    <span
                        className="ml-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">
                    {day.getDate()}
                  </span>
                </span>
                                        </div>
                                    )
                                }
                                return (
                                    <div key={dayIdx} className="flex items-center justify-center py-3">
                <span>
                  {daysOfWeek[dayIdx]} <span className="items-center justify-center font-bold">{day.getDate()}</span>
                </span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="flex flex-auto">
                        <div className="grid flex-auto grid-cols-1 grid-rows-1">
                            {/* Horizontal lines */}
                            <div
                                className="col-start-1 col-end-2 row-start-1 grid divide-y divide-neutral-100"
                                style={{gridTemplateRows: 'repeat(8, minmax(3.5rem, 1fr))'}}
                            >
                                <div ref={containerOffset} className="row-end-1 h-7"></div>

                            </div>

                            {/* Vertical lines */}
                            <div
                                className="col-start-1 col-end-2 row-start-1 hidden grid-cols-5 grid-rows-1 divide-x divide-neutral-600 sm:grid sm:grid-cols-5 bg-neutral-800">
                                <div className="col-start-1 row-span-full"/>
                                <div className="col-start-2 row-span-full"/>
                                <div className="col-start-3 row-span-full"/>
                                <div className="col-start-4 row-span-full"/>
                                <div className="col-start-5 row-span-full"/>
                                <div className="col-start-6 row-span-full w-1"/>
                            </div>

                            {/* Events */}
                            <ol
                                className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-5 sm:pr-8"
                                style={{gridTemplateRows: '1.75rem repeat(288, minmax(0, 1fr)) auto'}}
                            >
                                <li className="relative mt-px hidden sm:col-start-1 sm:flex flex-col"
                                >
                                    {routes.filter(r => isSameDay(r.date, days[0])).map(e => (
                                        <CalendarRoute key={e.id} routeInfo={e}/>))}
                                </li>
                                <li className="relative mt-px hidden sm:col-start-2 sm:flex flex-col"
                                >
                                    {routes.filter(r => isSameDay(r.date, days[1])).map(e => (
                                        <CalendarRoute key={e.id} routeInfo={e}/>))}
                                </li>
                                <li className="relative mt-px hidden sm:col-start-3 sm:flex flex-col"
                                >
                                    {routes.filter(r => r.date === days[2]).map(e => (
                                        <CalendarRoute key={e.id} routeInfo={e}/>))}
                                </li>
                                <li className="relative mt-px hidden sm:col-start-4 sm:flex flex-col"
                                >
                                    {routes.filter(r => r.date.getDate() === days[3]).map(e => (
                                        <CalendarRoute key={e.id} routeInfo={e}/>))}
                                </li>
                                <li className="relative mt-px hidden sm:col-start-5 sm:flex flex-col"
                                >
                                    {routes.filter(r => r.date.getDate() === days[4]).map(e => (
                                        <CalendarRoute key={e.id} routeInfo={e}/>))}
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
