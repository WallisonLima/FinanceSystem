import { filterListByMonth, getCurrentMonth } from './helpers/dateFilter'
import { categories } from './data/categories'
import { useEffect, useState } from 'react'
import { Category } from './types/Category'
import { items } from './data/items'
import { Item } from './types/Item'
import * as C from './App.styles'

import { TableArea } from './components/TableArea'
import { InfoArea } from './components/InfoArea'


function App() {
  const [list, setList] = useState(items)
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth())
  const [filterList, setFilterList] = useState<Item[]>([])
  const [income, setIncome] = useState(0)
  const [expense, setExpense] = useState(0)

  useEffect(() => {
    setFilterList(filterListByMonth(list, currentMonth))
  }, [list, currentMonth])

  const handleCurrentMonth = (newMonth: string) => {
    setCurrentMonth(newMonth)
  }

  return (
    <C.Container>
      <C.Header>
        <C.HeaderText>
          Sistema Financeiro
        </C.HeaderText>
      </C.Header>
      <C.Body>
        <InfoArea
          currentMonth={currentMonth}
          onMonthChange={handleCurrentMonth}
          income={income}
          expense={expense}
        />

        {/*  Área de inserção */}

        <TableArea list={filterList} />
      </C.Body>
    </C.Container>
  );
}

export default App;