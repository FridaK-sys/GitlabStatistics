import Settings from '../components/Settings';
import renderer from "react-test-renderer";

/** 
* Snapshot test for Settings-component
*/
describe("Jest Snapshot testing suite", () => {
  it("Matches DOM Snapshot", () => {
    const domTree = renderer.create(<Settings />).toJSON();
    expect(domTree).toMatchSnapshot();
  });
});
