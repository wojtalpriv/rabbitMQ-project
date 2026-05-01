import React, { useEffect } from 'react'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'

type Person = {
  id: number
  userName: string
  password: string
}

export function UsersTableStyled() {

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [data, setData] = React.useState<Person[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("https://127.0.0.1:3005/ocelot/getusers/");
      if (!res.ok){
        console.log(`fetch users error ${res.status}`);
      }

      const users: Person[] = await res.json();
      setData(users);
    };

    fetchUsers();
  }, []);

  const columns = React.useMemo<ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'id',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'userName',
        cell: (info) => info.getValue(),
        sortDescFirst: true,
      },
      {
        accessorKey: 'password',
        sortDescFirst: true,
      },
    ],
    [],
  )

  const table = useReactTable({
    columns,
    data,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(), //client-side sorting
    onSortingChange: setSorting, //optionally control sorting state in your own scope for easy access
    state: {
      sorting,
    },
  })

  //access sorting state from the table instance
  console.log(table.getState().sorting)

  return (
    <div className="p-2 flex justify-center flex-col items-center text-gray-400 ">
      <div className="h-2" />
      <table>
        <thead className='border-3 border-gray-500'>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : ''
                        }
                        onClick={header.column.getToggleSortingHandler()}
                        title={
                          header.column.getCanSort()
                            ? header.column.getNextSortingOrder() === 'asc'
                              ? 'Sort ascending'
                              : header.column.getNextSortingOrder() === 'desc'
                                ? 'Sort descending'
                                : 'Clear sort'
                            : undefined
                        }
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table
            .getRowModel()
            .rows
            .map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id} className='border-3 border-gray-500'>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}