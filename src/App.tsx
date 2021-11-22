import { filterListByMonth, getCurrentMonth } from './helpers/dateFilter'
import { categories } from './data/categories'
import { useEffect, useState } from 'react'
import { Category } from './types/Category'
import { items } from './data/items'
import { Item } from './types/Item'
import * as C from './App.styles'

import { TableArea } from './components/TableArea'


function App() {
  const [list, setList] = useState(items)
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth())
  const [filterList, setFilterList] = useState<Item[]>([])

  useEffect(() => {
    setFilterList(filterListByMonth(list, currentMonth))
  }, [list, currentMonth])

  return (
    <C.Container>
      <C.Header>
        <C.HeaderText>
          Sistema Financeiro
        </C.HeaderText>
      </C.Header>
      <C.Body>
        {/*  Área de informações */}

        {/*  Área de inserção */}

        <TableArea list={filterList}/>
      </C.Body>
    </C.Container>
  );
}

export default App;