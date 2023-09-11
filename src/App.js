import { NavLink, Route, Routes } from "react-router-dom";
import GlobalStyle from "./components/GlobalStyle";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import Aside from "./components/Aside";
import { ThemeProvider } from "styled-components";
import { useState } from "react";
import Example3 from "./pages/Example3";
import Example4 from "./pages/Example4";
import Datepicker from "./pages/Datepicker";
// import Example from "./pages/Example";
// import Example2 from "./pages/Example2";
// import Example3 from "./pages/Example3";

function App() {
    const light = {
        colors: {
            Primary : "salmon",
            Secondary : "white",
            BgColor : "#e9f1f6",
            Color : "#000",
            ContentBg : "#fff"
        }
    }
    const dark = {
        colors: {
            Primary : "#272929",
            Secondary : "#e9e9e9",
            BgColor : "#333",
            Color : "#e9e9e9",
            ContentBg : "#272929"
        }
    }
    
    const [themeConfig, setThemeConfig] = useState("light");
    const DarkMode = themeConfig === 'light' ? light : dark;
    const ThemeSelect = () => {
        setThemeConfig(themeConfig === 'light' ? 'dark' : 'light');
    }

    return (
        <>
        <ThemeProvider theme={DarkMode}> {/* 항상 최상단에 와서 감싸야함, 뒤에 오는 건 변수명(작명) */}
            <GlobalStyle />
            <Aside ThemeSelect={ThemeSelect} themeConfig={themeConfig}></Aside>
            <Routes>
                {/* <Route path="/" element={<Main/>}></Route> */}
                <Route path="/" element={<Main/>}></Route>
                <Route path="/detail/:seq" element={<Detail/>}></Route>
                <Route path="/ex3" element={<Example3/>}></Route>
                <Route path="/ex4" element={<Example4/>}></Route>
                <Route path="/datepicker" element={<Datepicker/>}></Route>
            </Routes>
        </ThemeProvider>
        </>
    );
}

export default App;