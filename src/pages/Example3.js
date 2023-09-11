import React, { useState } from 'react'
import Example3_ from './../components/Example3';
import { styled } from 'styled-components';

const Content = styled.div`
    ul {
        list-style: none;
        display: flex;
        justify-content: space-between;
        padding-bottom: 20px;
        li {
            font-size: 20px;
            &:hover {
                font-weight: bold;
                color: salmon;
            } // &:hover
        } // li
    } // ul
    width: 500px;
    margin: 0 auto;
    cursor: pointer;
`;

const ContentItem = styled.div`
    display: flex;
    flex-basis: 100%;
    justify-content: space-between;
`;

function Example3() {
    const [data, setData] = useState(Example3_);
    const [animal, setAnimal] = useState("전체");
    const [gender, setGender] = useState("전체");
    // animal : 읽기전용, setAnimal : 쓰기전용

    const FilterAnimal = data.filter(e => {
        let isAnimal = animal === "전체" || e.animal === animal;
        let isGender = gender === "전체" || e.gender === gender;
        return isAnimal && isGender;
        // if (animal === "전체") {
        //     return e.animal;
        // } else {
        //     return e.animal === animal;
        // }
        // return (animal === "전체" ? e.animal : e.animal === animal);
    });

    const filterCate = [...new Set(data.map(e => e.animal))];
    const filterCate2 = [...new Set(data.map(e => e.gender))];
    return (
        <Content>
        <>
            <div>
                <ul>
                    <li>전체</li>
                    {
                        filterCate.map((e, i) => {
                            return (
                                <li key={i} onClick={() => {setAnimal(e)}}>{e}</li>
                            )
                        })
                    }
                </ul>
                <ul>
                    <li>전체</li>
                    {
                        filterCate2.map((e, i) => {
                            return (
                                <li key={i} onClick={() => {setGender(e)}}>{e}</li>
                            )
                        })
                    }
                </ul>
            </div>
            <div>
                <ul>
                    {
                        FilterAnimal.map((e, i) => {
                            return (
                                <li key={i}>{e.animal} - {e.gender} - {e.height}</li>
                            )
                        })
                    }
                </ul>
            </div>
        </>
            <ContentItem>
            {/* {
                dataFilter.map((el, i) => {
                    return (
                        <p key={i}>{el.id}</p>
                    );
                })
            } */}
            </ContentItem>
        </Content>
    );
}

export default Example3