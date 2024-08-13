import classes from './App.module.css';
import Header from './components/Header';
import Result from './components/Result';
import Details from './components/Details';


function App() {

  return (
    <div className={classes.App}>
      <Header />
      <div className={classes.flex}>
        <Result />
        <Details />
      </div>
      <footer className={classes.footer} />
    </div>
  );
}

export default App;
