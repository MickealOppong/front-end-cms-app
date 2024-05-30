import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setCurrency } from "../features/data/selectSlice";
import { customFetch } from "../util";
const CurrencySelect = ({ size, data, defaultValue, name, index }) => {
  const [toggle, setToggle] = useState(false)
  const [value, setValue] = useState(defaultValue ?? data[0])
  const [inputValue, setInputValue] = useState('')
  const dispatch = useDispatch();
  const [fx, setFx] = useState(0);
  const queryClient = useQueryClient();
  const token = useSelector((state) => state.userState.token)


  const handleClick = async (i) => {
    setValue(() => i)
    setToggle(() => false)
    try {
      const response = await customFetch.get(`/api/currency/rate/${i}`, {
        params: {
          iso: i
        },
        headers: {
          Authorization: `Bearer ${token} `
        }
      })
      console.log(response.data.fxRate);
      const fx = response.data.fxRate
      dispatch(setCurrency({ iso: i, fx }))
      localStorage.setItem('currency', JSON.stringify({ iso: i, fx }))
      queryClient.removeQueries(['products'])
    } catch (error) {
      console.log(error);
    }
  }

  window.addEventListener('click', (e) => {
    const id = e.target.dataset.id;
    if (!id && toggle || id === 'tag') {
      setToggle(false)
    }
  })



  return <article className={`${size ?? 'w-56'} relative`} >
    <div className="flex justify-between border-[1px] rounded-md p-2" data-id="select" onClick={() => setToggle(true)} >
      <input value={value} onChange={() => setInputValue(value)} className="outline-none w-[80%] capitalize text-gray-700" name={name} data-id="select" />
      <button type="button" className="text-gray-700" data-id="select" ><AiFillCaretDown data-id="select" /></button>
    </div>
    <div className={`flex flex-col absolute -top-1/2 bg-white ${size} mt-2 border-[1px] overflow-auto no-scrollbar h-36 rounded-md ${toggle ? 'flex' : 'hidden'}`} data-id="select">
      {
        data.map((i) => {
          return <div key={i} onClick={() => handleClick(i)} className={`flex flex-col capitalize hover:bg-slate-100 text-gray-700 p-2 ${size}`} >
            <p >{i}</p>
          </div>
        })
      }
    </div>
  </article >

}
export default CurrencySelect;