export default ({
  target,
  addOns,
  keyName,
  cb,
}) => (
  target.map((value, i, ar) => (
    { ...value, [keyName]: cb(addOns, value, i, ar) }
  ))
);

