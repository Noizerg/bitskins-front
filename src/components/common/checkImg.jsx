const ShowImgOnly = (props) => {
  const ChangeValue = (e) => {
    props.onImageRequired(e.target.checked);
  };
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        value=""
        id="flexCheckChecked"
        checked={props.checked}
        onChange={(e) => ChangeValue(e)}
      ></input>
      <label className="form-check-label" for="flexCheckChecked">
        {' '}
        Image Required
      </label>
    </div>
  );
};

export default ShowImgOnly;
