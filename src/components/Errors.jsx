const FormErrors = ({ errors }) => {
  return (
    <ul className="text-danger small mt-1 mb-1">
      {errors.map((error, index) => (
        <li key={index}>{error}</li>
      ))}
    </ul>
  );
};

export default FormErrors;
