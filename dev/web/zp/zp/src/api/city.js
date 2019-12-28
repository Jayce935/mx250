/*
 * @Author: liuyr 
 * 城市模块API
 * @Date: 2019-12-22 18:54:17 
 * @Last Modified by: 0tt0
 * @Last Modified time: 2019-12-25 09:35:20
 */
import axios from '@/utils/axios'

/* 查找数据 */
export function findAllCity() {
  return axios.get('/City/findAll');
  // return axios.get('/City/findAll',{params:params});
  // return axios.post('/City/findAll',params);
}

/**
 * 根据id删除城市信息
 * @param {Object} param {id:''}
 */
export function deleteCityById(param){
  return axios.post('/City/deleteById',param);
}
/**
 * 通过省份查找商家信息
 * @param {Object} param {province:''}
 */
export function findCityByProvince(param){
  return axios.get('/City/findByProvinceId',{params:param});
}
/**
 * 通过id查找商家信息
 * @param {Object} param {id:''} 
 */
export function findCityById(param){
  return axios.get('/City/findById',{params:param});
}
/**
 * 新增或修改商家信息
 * @param {Object} param 
 */
export function saveOrUpdateCity(param){
  return axios.post('/City/saveOrUpdate',param);
}