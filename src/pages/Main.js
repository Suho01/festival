import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { NavLink } from 'react-router-dom'

const Content = styled.div`
    background-color: ${(props) => props.theme.colors.BgColor};
    width: 100%;
    padding: 120px 0 50px 0;
    overflow: hidden;
`;
const ContentWrap = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2%;
    display: flex;
    flex-wrap: wrap;
    gap: 20px 1.2%;
`;
const ContentItem = styled.div`
    background-color: ${(props) => props.theme.colors.ContentBg};
    flex-basis: 32.5%;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 20px;
    box-sizing: border-box;
    cursor: pointer;
    white-space: break-spaces; // 줄이 길어지면 자동으로 줄바꿈
    img {
        width: 100%;
        display: block;
        margin-bottom: 24px;
    } // img
    h3 {
        margin-bottom: 24px;
        color : ${(props) => props.theme.colors.Color};
    } // h3
    li {
        line-height: 2;
        margin-bottom: 6px;
        color : ${(props) => props.theme.colors.Color};
    } // li

    @media screen and (max-width: 1200px) {
        flex-basis: 49%;
    }
    @media screen and (max-width: 640px) {
        flex-basis: 100%;
    }
`;
// https://apis.data.go.kr/6260000/FestivalService/getFestivalKr?serviceKey=apswqAnilDaPgarY9aPkhSA5F1gbTkcVXlhLaHC6ej7QGGWu0SA1piqYzlMD5KJjCHLXWmdcJdFqTDBirPtyTw%3D%3D&pageNo=1&numOfRows=10&resultType=json

const Category = styled.div`
    width: 100%;
    margin-bottom: 1.2%;
    ul {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        li {
            border: 1px solid #ddd;
            padding: 5px 20px;
            border-radius: 5px;
            cursor: pointer;
            background-color: ${(props) => props.theme.colors.ContentBg};
            color : ${(props) => props.theme.colors.Color};
            &.on {
                background-color: salmon;
                font-weight: bold;
                color: #fff;
            } // &.on
        } // li
    } // ul
`;

const Pagination = styled.div`
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    border: 1px solid #000;
    ul {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        column-gap: 20px;
        justify-content: center;
        align-items: center;
        li {
            border: 1px solid #ddd;
            border-radius: 5px;
            cursor: pointer;
            background-color: ${(props) => props.theme.colors.ContentBg};
            padding: 5px 20px;
            &.on {
                background-color: salmon;
                font-weight: bold;
                color: #fff;
            } // &.on
        } // li
    } // ul
`;

function Main() {

    const [data, setData] = useState();
    const [allData, setAllData] = useState();

    const list = 10; // 화면에 보이는 것 10개
    const [page, setPage] = useState(1); // 페이지 수(처음엔 1)
    const [totalCnt, setTotalCnt, totalCount] = useState(0);
    const [gugun, setGugun] = useState("전체");
    const pagination = 5;
    const totalPage = Math.floor(totalCnt / list); // 소숫점 버리기 floor

    let startPage, endPage; // 변수설정만 하고 값은 지정하지 않음

    const currentBlock = Math.ceil(page / pagination); // 소숫점 올리기 ceil
    // 현재 페이지가 1일때 나누기 5 = 0.2 올리기 하면 1
    startPage = (currentBlock - 1) * pagination + 1;
    endPage = startPage + pagination - 1;

    if (endPage > totalPage) {
        endPage = totalPage;
    }
    const PrevBlock = () => {
        if (startPage > 1) {
            setPage(startPage - pagination);
        }
    }
    const NextBlock = () => {
        if (endPage < totalPage) {
            setPage(startPage + pagination);
        }
    }

    const PageList = [];
    for (let i = startPage; i <= endPage; i++) {
        PageList.push(
            <li key={i} className={(page === i ? "on" : "")} onClick={() => {setPage(i)}}>
                {i}
            </li>
        )
    }

    useEffect(() => {
        axios.get(`https://apis.data.go.kr/6260000/FestivalService/getFestivalKr?serviceKey=${process.env.REACT_APP_APIKEY}&pageNo=1&numOfRows=100&resultType=json`)
        .then(function(res) {
            setAllData(res.data.getFestivalKr.item);
        });
    }, [])

    useEffect(() => {
        axios.get(`https://apis.data.go.kr/6260000/FestivalService/getFestivalKr?serviceKey=${process.env.REACT_APP_APIKEY}&pageNo=${page}&numOfRows=10&resultType=json`)
        .then(function(res) {
            setData(res.data.getFestivalKr.item);
            setTotalCnt(res.data.getFestivalKr.totalCount);
        });
    }, [page])

    const FilterData = data && data.filter(e => {
        return gugun === "전체" || gugun === e.GUGUN_NM;
    })

    const FilterGugun = [...new Set(allData && allData.map(e => e.GUGUN_NM))];

    const [isActive, setIsActive] = useState(-1); // false나 숫자가 들어가야함

    return (
        <>
            <Content>
                <Category>
                    {/* <div>{`인덱스번호 : -1`}</div>
                    {
                    Array(8).fill().map((e, i) => {
                        return (
                            <div className={isActive === i ? 'on' : ''}>{`인덱스번호 : ${i}`}</div>
                        )
                    })
                    } */}
                    <ul>
                        <li className={isActive === -1 ? 'on' : ''} onClick={
                            () => {
                                setIsActive(-1);
                                setGugun("전체");
                            }
                        }>전체</li>
                        {
                            data && FilterGugun.map((e, i) => {
                                return (
                                    <li className={isActive === i ? 'on' : ''} onClick={
                                        () => {
                                            setIsActive(i); // boolean 속성 true, false일 때만 사용할 수 있음 !isActive : isActive === false ? true : false
                                            setGugun(e);
                                        }
                                    } key={i}>{e}</li>
                                )
                            })
                        }
                    </ul>
                </Category>
                <ContentWrap>
                    {                
                    data && FilterData.map((e, i) => {
                        return (
                            <ContentItem key={i}>
                                <NavLink to={`detail/${e.UC_SEQ}`}
                                    state={
                                        e
                                    }
                                >
                                    <h3>{e.TITLE}</h3>
                                    <img src={e.MAIN_IMG_THUMB} alt={e.MAIN_TITLE} />
                                    <ul>
                                        <li>구군 : {e.GUGUN_NM}</li>
                                        <li>운영 및 시간 : {e.USAGE_DAY_WEEK_AND_TIME}</li>
                                        {
                                            e.MIDDLE_SIZE_RM1 !== "" && <li>편의시설 : {e.MIDDLE_SIZE_RM1}</li>
                                        }
                                        <li>이용요금 : {e.USAGE_AMOUNT}</li>
                                        <li>교통편 : {e.TRFC_INFO}</li>
                                        <li>주요장소 : {e.MAIN_PLACE}</li>
                                    </ul>
                                </NavLink>
                            </ContentItem>
                        )
                    })
                    }
                </ContentWrap>
            </Content>
            <Pagination>
                <ul>
                    <li onClick={PrevBlock}>이전</li>
                    {PageList}
                    <li onClick={NextBlock}>다음</li>
                </ul>
            </Pagination>
        </>
    )
}

export default Main