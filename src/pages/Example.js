import React, { useState } from 'react'
import Example_ from './../components/Example'
import { styled } from 'styled-components';

const Content = styled.div`
    display: flex;
    justify-content: space-between;
`;

function Example() {
    let [data, setData] = useState(Example_);
    // useState : 재렌더링 되는 비동기 형식 변수
    // data는 useState(Example_) 그대로 가져오고(읽기전용이라 바꿀 수 없음), setData는 쓰기전용

    let [job, setJob] = useState("전체");
    // job : 읽기전용, setJob : 쓰기전용

    const dataFilter = data.filter(e => {
        if (job === "전체") {
            return e.job;
        } else {
            return e.job === job;
        }
    });
    
    const FilterJob = [...new Set(data.map(e => e.job))];
    // 중복 제거 배열 복사 new Set
    
    return (
        <Content>
            <>
            <ul>
                <li onClick={() => {setJob("전체");}}>전체</li>
                {
                    FilterJob.map((e, i) => {
                        return (
                            <li key={i} onClick={() => setJob(e)}>{e}</li>
                        )
                    })
                }
            </ul>
            </>

            {/* {data.map((e, i, a) => {
            return (
                <>
                    <div key={i}>
                        <p>{e.name}</p>
                        <p>{i}</p>
                        <p>{a[i].name}</p>
                    </div>
                </>
            )
        })} */}
            {
                dataFilter.map((el, i) => {
                    return (
                        <p key={i}>{el.name}</p>
                    );
                })
            }
        </Content> // object 출력방식 (앞쪽은 변수명, 뒤쪽은 key값)
    );
}

export default Example