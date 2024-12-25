import { useTodoContext } from "../contexts/TodoContext";

const Form = () => {
  const { text, setText, handleSubmit } = useTodoContext();

  return (
    <div
      className={`max-w-md mx-auto mt-10 p-6 rounded-lg shadow-md text-black`}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className="flex justify-between py-2 px-2">
            <label
              htmlFor="user-input"
              className={`block text-sm font-medium mb-2`}
            >
              Enter your message
            </label>
          </div>
          <input
            id="user-input"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Type something..."
          />
        </div>
        <button
          type="submit"
          disabled={!text.length ? true : false}
          className={`w-full py-2 rounded-md transition duration-300 bg-blue-500 active:bg-blue-700`}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
