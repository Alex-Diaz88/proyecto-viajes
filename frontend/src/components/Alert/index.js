import "./styles.css";
import checkedIcon from "../../assets/icons/checked.png";
import warningIcon from "../../assets/icons/warning.png";
import { useContext, useEffect } from "react";
import { AlertContext } from "../../contexts/AlertContext";

const Alert = () => {
  const { alert, setAlert } = useContext(AlertContext);

  const { type, msg } = alert;

  useEffect(() => {
    if (alert.msg) {
      const timeoutID = setTimeout(() => {
        setAlert({ type: "", msg: "" });
      }, 4000);

      return () => {
        clearTimeout(timeoutID);
      };
    }
  }, [alert, setAlert]);

  return (
    <>
      {msg && (
        <section className={`alert ${type}`}>
          {type === "success" && (
            <img
              className="checked_icon"
              src={checkedIcon}
              alt="success icon"
            />
          )}
          {type === "error" && (
            <img className="warning_icon" src={warningIcon} alt="error icon" />
          )}

          <p>{msg}</p>
        </section>
      )}
    </>
  );
};

export default Alert;
