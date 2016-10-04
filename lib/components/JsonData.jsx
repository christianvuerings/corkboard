import React, { PropTypes } from 'react';

function Map(props) {
  const { map } = props;
  const keys = Object.keys(map);
  const len = keys.length;
  return (
    <span className="flex gray">
      <span className="gray mr1">{'{'}</span>
      <span>
        {keys.map((key, i) => (
          <span className="flex" key={i}>
            <JsonData data={key} />
            {': '}
            <JsonData data={map[key]} />
            {i < (len - 1) ? <span className="self-end">,</span> : null}
          </span>
        ))}
      </span>
      <span className="self-end gray ml1">{'}'}</span>
    </span>
  );
}

function Arr(props) {
  const { arr } = props;
  const len = arr.length;
  return (
    <span className="flex gray">
      <span className="gray mr1">{'['}</span>
      <span>
        {arr.map((n, i) => (
          <span className="flex" key={i}>
            <JsonData data={n} />
            {i < (len - 1) ? <span className="self-end">,</span> : null}
          </span>
        ))}
      </span>
      <span className="self-end gray ml1">{']'}</span>
    </span>
  );
}

function Str(props) {
  const { str } = props;
  return (
    <span className="olive">{JSON.stringify(str)}</span>
  );
}

function Num(props) {
  const { number } = props;
  return (
    <span className="olive">{number}</span>
  );
}

export default function JsonData(props) {
  const { data } = props;
  if (Array.isArray(data)) {
    return <Arr arr={data} />;
  }
  switch (typeof data) {
    case 'object':
      return <Map map={data} />;
    case 'string':
      return <Str str={data} />;
    case 'number':
      return <Num number={data} />;
    default:
      return <span className="black">{data.toString()}</span>;
  }
}

JsonData.propTypes = {
  data: PropTypes.any.isRequired,
};
