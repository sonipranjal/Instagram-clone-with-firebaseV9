/* return [data,error]
 */
export const handlePromise = async (promise) => {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    return [null, error];
  }
};
