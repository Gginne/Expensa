import apiClient from "./apiClient";
import { createBrowserHistory } from "history";

export const getCategories = async () => {
  try {
    const res = await apiClient.get("/api/categories");
    const expense = res.data.expense.map(({ cols }) => ({
      name: cols.name,
      id: cols.id,
    }));
    const income = res.data.income.map(({ cols }) => ({
      name: cols.name,
      id: cols.id,
    }));
    //console.log(res)
    return { expense, income };
  } catch (err) {
    console.log(err);
  }
};

export const getEntries = async (type) => {
  try {
    const res = await apiClient.get(`/api/${type}`);
    const entries = res.data.map(({ cols }) => ({ ...cols, type }));
    return entries;
  } catch (err) {
    console.log(err);
  }
};

export const deleteEntry = async (type, id) => {
  try {
    const res = await apiClient.delete(`/api/${type}/delete/${id}`);
  } catch (err) {
    console.log(err);
  }
};

export const getSessionStorage = (key, initialValue) => {
  try {
    const value = window.sessionStorage.getItem(key);
    return value ? JSON.parse(value) : initialValue;
  } catch (e) {
    // if error, return initial value
    return initialValue;
  }
};

export const setSessionStorage = (key, value) => {
  try {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
};

export const history = createBrowserHistory();
