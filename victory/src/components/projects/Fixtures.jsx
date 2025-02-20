import React,{useEffect, useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Fixture = () => {

const [data,setData] = useState([]);
const navigate = useNavigate();

  useEffect(() =>{
    axios.get('http://localhost:7000/fixtures')
    .then((res) => {
      setData(res.data);
      console.log(res.data)
    }).catch((err) =>{
      console.log(err)
    })
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }).replace(',', '');
  };
  return (
    <div className='w-full h-full'>
      <section className='w-full h-full flex flex-col justify-center bg-[#F2F3F4]'>
        {data.map((item) => {
          return (
            <div className='w-[65%] h-40 rounded-[30px] mx-24 shadow-[0_10px_25px_rgba(0,0,0,0.1)] border-2 my-4 cursor-pointer'
            onClick={()=> navigate(`/match/${item._id}`)}
            >
              <div>
              <p className='fonn text-lg text-slate-700 font-bold mt-3 px-4 underline' >{formatDate(item.match.dates[0].date)}</p>
              <p className='fonn text-slate-700 font-semibold pl-4' >{item.match.first_team.code} Vs {item.match.second_team.code}, {item.match.dates[0].match_subtitle} at {item.match.venue}</p>
              </div>
              <div>
              <div className='flex flex-col-3 ml-12'>
                <div>
                  <img src={item.match.first_team.flag} width={75} className='mx-20 pt-1'/>
                  <p className='relative -top-16 text-2xl font-bold left-48'>{item.match.first_team.code}</p>
                  <p className='relative -top-[4.5rem] text-lg fonn left-48'>{item.match_info.match_summary.first_team_score}</p>
                  <p className='relative -top-[5.1rem] text-[16px] fonn left-48'>({item.match_info.scorecard[0].overs})</p>
                </div>
                <div className='w-96'>
                  <p className='fon text-xl pt-4 pl-28 text-yellow-500'>{item.match_info.scorecard.map((item) => item.won)}</p>
                </div>
                <div>
                <div>
                  <img src={item.match.second_team.flag} width={75} className='ml-36 pt-1'/>
                  <p className='relative -top-16 text-2xl font-bold left-3'>{item.match.second_team.code}</p>
                  <p className='relative -top-[4.7rem] text-lg fonn left-3'>{item.match_info.match_summary.second_team_score}</p>
                  <p className='relative -top-[5.1rem] text-[16px] fonn left-3'>({item.match_info.scorecard[1].overs})</p>
                </div>
                </div>
              </div>
              </div>
            </div>
          )
        })
        }
      </section>
    </div>
  )
}

export default Fixture;
