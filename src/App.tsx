import { filterListByMonth, getCurrentMonth } from './helpers/dateFilter'
import { categories } from './data/categories'
import { useEffect, useState } from 'react'
import { Category } from './types/Category'
import { items } from './data/items'
import { Item } from './types/Item'
import * as C from './App.styles'


import { TableArea } from './components/TableArea'
import { InfoArea } from './components/InfoArea'
import { InputArea } from './components/InputArea'


function App() {
  const [list, setList] = useState(items)
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth())
  const [filterList, setFilterList] = useState<Item[]>([])
  const [income, setIncome] = useState(0)
  const [expense, setExpense] = useState(0)

  useEffect(() => {
    setFilterList(filterListByMonth(list, currentMonth))
  }, [list, currentMonth])

  useEffect(()=>{
    let incomeCount = 0;
    let expenseCount = 0;
    for(let i in filterList){
      if(categories[filterList[i].category].expense){
        expenseCount += filterList[i].value
      } else{
        incomeCount += filterList[i].value
      }
    }
    setIncome(incomeCount)
    setExpense(expenseCount)

  }, [filterList])

  const handleCurrentMonth = (newMonth: string) => {
    setCurrentMonth(newMonth)
  }

  const handleAddItem = ( item: Item ) =>{
    let newList = [...list];
    newList.push(item);
    setList(newList)
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

        <InputArea onAdd={handleAddItem}/>

        <TableArea list={filterList} />
      </C.Body>
    </C.Container>
  );
}

export default App;