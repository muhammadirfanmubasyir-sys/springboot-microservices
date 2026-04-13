kompose convert
===============
https://kubernetes.io/docs/tasks/configure-pod-container/translate-compose-kubernetes/

Download
========
https://github.com/kubernetes/kompose/releases/kompose-linux-amd64

in deployment folder
====================
../kompose99 convert

INFO Kubernetes file "api-gateway-service.yaml" created
INFO Kubernetes file "broker-service.yaml" created
..

kubectl
=======
deployment$ ls -l
total 8
drwxrwxrwx 1 irfan irfan 4096 Apr 12 13:54 1-databases
drwxrwxrwx 1 irfan irfan 4096 Apr 12 13:49 2-kafka
drwxrwxrwx 1 irfan irfan 4096 Apr 12 13:49 3-keycloak
drwxrwxrwx 1 irfan irfan 4096 Apr 12 13:47 4-deployment-services
drwxrwxrwx 1 irfan irfan 4096 Apr 12 13:48 5-lgtm

$ kubectl create ns bismillah

$ kubectl get ns
NAME                STATUS   AGE
argocd              Active   6d3h
argocd-nginx-demo   Active   6d2h
bismillah           Active   4m10s
default             Active   65d
kube-node-lease     Active   65d
kube-public         Active   65d
kube-system         Active   65d

$ kubectl apply -f 1-databases/ -n bismillah

$ kubectl get pod -n bismillah
NAME                                  READY   STATUS    RESTARTS   AGE
keycloak-mysql-b49cf474d-gtqc9        1/1     Running   0          2m22s
mongodb-irfan-69cd7575b6-kt65n        1/1     Running   0          2m22s
postgres-inventory-59984f96b8-lfdll   1/1     Running   0          2m22s
postgres-order-78d5859998-5sqkv       1/1     Running   0          2m22s
postgres-product-5f4f7b86db-wpg2t     1/1     Running   0          2m22s

$ kubectl get svc -n bismillah
NAME                 TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)     AGE
keycloak-mysql       ClusterIP   10.102.133.246   <none>        3306/TCP    2m28s
mongodb-irfan        ClusterIP   10.109.195.137   <none>        27017/TCP   2m28s
postgres-inventory   ClusterIP   10.96.18.247     <none>        5434/TCP    2m28s
postgres-order       ClusterIP   10.110.254.103   <none>        5431/TCP    2m28s
postgres-product     ClusterIP   10.98.113.101    <none>        5433/TCP    2m28s

$ kubectl apply -f 2-kafka/ -n bismillah
deployment.apps/broker created
service/broker created

$ minikube ssh -- free -m
               total        used        free      shared  buff/cache   available
Mem:            7796        2392        2814          66        2847        5404
Swap:           2048          20        2027

$ df -kh .
Filesystem      Size  Used Avail Use% Mounted on
D:\             123G  9.6G  113G   8% /mnt/d

$ kubectl get pod -n bismillah
NAME                                  READY   STATUS    RESTARTS   AGE
broker-686bb465b5-n8t7z               1/1     Running   0          5m38s
keycloak-mysql-b49cf474d-gtqc9        1/1     Running   0          9m58s
mongodb-irfan-69cd7575b6-kt65n        1/1     Running   0          9m58s
postgres-inventory-59984f96b8-lfdll   1/1     Running   0          9m58s
postgres-order-78d5859998-5sqkv       1/1     Running   0          9m58s
postgres-product-5f4f7b86db-wpg2t     1/1     Running   0          9m58s

$ kubectl get svc -n bismillah
NAME                 TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)     AGE
broker               ClusterIP   10.97.149.249    <none>        9092/TCP    5m47s
keycloak-mysql       ClusterIP   10.102.133.246   <none>        3306/TCP    10m
mongodb-irfan        ClusterIP   10.109.195.137   <none>        27017/TCP   10m
postgres-inventory   ClusterIP   10.96.18.247     <none>        5434/TCP    10m
postgres-order       ClusterIP   10.110.254.103   <none>        5431/TCP    10m
postgres-product     ClusterIP   10.98.113.101    <none>        5433/TCP    10m

$ kubectl apply -f 3-keycloak/ -n bismillah
persistentvolumeclaim/keycloak-claim0 created
deployment.apps/keycloak created
service/keycloak created

$ kubectl get pod -n bismillah
NAME                                  READY   STATUS    RESTARTS   AGE
broker-686bb465b5-n8t7z               1/1     Running   0          20m
keycloak-59b4b9dcf8-m2txr             1/1     Running   0          13m
keycloak-mysql-b49cf474d-gtqc9        1/1     Running   0          24m
mongodb-irfan-69cd7575b6-kt65n        1/1     Running   0          24m
postgres-inventory-59984f96b8-lfdll   1/1     Running   0          24m
postgres-order-78d5859998-5sqkv       1/1     Running   0          24m
postgres-product-5f4f7b86db-wpg2t     1/1     Running   0          24m

$ kubectl get svc -n bismillah
NAME                 TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)     AGE
broker               ClusterIP   10.97.149.249    <none>        9092/TCP    20m
keycloak             ClusterIP   10.106.59.49     <none>        8080/TCP    13m
keycloak-mysql       ClusterIP   10.102.133.246   <none>        3306/TCP    25m
mongodb-irfan        ClusterIP   10.109.195.137   <none>        27017/TCP   25m
postgres-inventory   ClusterIP   10.96.18.247     <none>        5434/TCP    25m
postgres-order       ClusterIP   10.110.254.103   <none>        5431/TCP    25m
postgres-product     ClusterIP   10.98.113.101    <none>        5433/TCP    25m

$ kubectl apply -f 4-deployment-services/ -n bismillah
deployment.apps/api-gateway unchanged
service/api-gateway unchanged
deployment.apps/discovery-server unchanged
service/discovery-server unchanged
deployment.apps/inventory-service unchanged
deployment.apps/notification-service unchanged
deployment.apps/order-service unchanged
deployment.apps/product-service unchanged

$ kubectl get pod -n bismillah
NAME                                    READY   STATUS    RESTARTS   AGE
api-gateway-75d7697447-h257x            1/1     Running   0          18m
broker-686bb465b5-n8t7z                 1/1     Running   0          40m
discovery-server-676467c577-rtv7g       1/1     Running   0          18m
inventory-service-795f876597-kr7ms      1/1     Running   0          18m
keycloak-59b4b9dcf8-m2txr               1/1     Running   0          33m
keycloak-mysql-b49cf474d-gtqc9          1/1     Running   0          44m
mongodb-irfan-69cd7575b6-kt65n          1/1     Running   0          44m
notification-service-67bbdc7476-wshqk   1/1     Running   0          18m
order-service-566885568-t6jsx           1/1     Running   0          18m
postgres-inventory-59984f96b8-lfdll     1/1     Running   0          44m
postgres-order-78d5859998-5sqkv         1/1     Running   0          44m
postgres-product-5f4f7b86db-wpg2t       1/1     Running   0          44m
product-service-54cd59b77f-528sr        1/1     Running   0          18m

$ kubectl get svc -n bismillah
NAME                 TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)     AGE
api-gateway          ClusterIP   10.111.111.39    <none>        8888/TCP    18m
broker               ClusterIP   10.97.149.249    <none>        9092/TCP    40m
discovery-server     ClusterIP   10.99.19.177     <none>        8762/TCP    18m
keycloak             ClusterIP   10.106.59.49     <none>        8080/TCP    33m
keycloak-mysql       ClusterIP   10.102.133.246   <none>        3306/TCP    44m
mongodb-irfan        ClusterIP   10.109.195.137   <none>        27017/TCP   44m
postgres-inventory   ClusterIP   10.96.18.247     <none>        5434/TCP    44m
postgres-order       ClusterIP   10.110.254.103   <none>        5431/TCP    44m
postgres-product     ClusterIP   10.98.113.101    <none>        5433/TCP    44m

$ kubectl apply -f 5-lgtm/ -n bismillah
persistentvolumeclaim/grafana-lgtm-claim0 created
persistentvolumeclaim/grafana-lgtm-claim2 created
persistentvolumeclaim/grafana-lgtm-claim3 created
deployment.apps/grafana-lgtm created
service/grafana-lgtm created

$ kubectl get pod -n bismillah
NAME                                    READY   STATUS    RESTARTS   AGE
api-gateway-75d7697447-h257x            1/1     Running   0          40m
broker-686bb465b5-n8t7z                 1/1     Running   0          61m
discovery-server-676467c577-rtv7g       1/1     Running   0          40m
grafana-lgtm-665d8f5cc4-7hmwh           1/1     Running   0          8m45s
inventory-service-795f876597-kr7ms      1/1     Running   0          40m
keycloak-59b4b9dcf8-m2txr               1/1     Running   0          54m
keycloak-mysql-b49cf474d-gtqc9          1/1     Running   0          66m
mongodb-irfan-69cd7575b6-kt65n          1/1     Running   0          66m
notification-service-67bbdc7476-wshqk   1/1     Running   0          40m
order-service-566885568-t6jsx           1/1     Running   0          40m
postgres-inventory-59984f96b8-lfdll     1/1     Running   0          66m
postgres-order-78d5859998-5sqkv         1/1     Running   0          66m
postgres-product-5f4f7b86db-wpg2t       1/1     Running   0          66m
product-service-54cd59b77f-528sr        1/1     Running   0          40m

$ kubectl get svc -n bismillah
NAME                 TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)                      AGE
api-gateway          ClusterIP   10.111.111.39    <none>        8888/TCP                     40m
broker               ClusterIP   10.97.149.249    <none>        9092/TCP                     61m
discovery-server     ClusterIP   10.99.19.177     <none>        8762/TCP                     40m
grafana-lgtm         ClusterIP   10.102.127.59    <none>        3000/TCP,4317/TCP,4318/TCP   8m55s
keycloak             ClusterIP   10.106.59.49     <none>        8080/TCP                     55m
keycloak-mysql       ClusterIP   10.102.133.246   <none>        3306/TCP                     66m
mongodb-irfan        ClusterIP   10.109.195.137   <none>        27017/TCP                    66m
postgres-inventory   ClusterIP   10.96.18.247     <none>        5434/TCP                     66m
postgres-order       ClusterIP   10.110.254.103   <none>        5431/TCP                     66m
postgres-product     ClusterIP   10.98.113.101    <none>        5433/TCP                     66m


$ kubectl port-forward svc/grafana-lgtm 3000:3000 -n demo-ns --address=0.0.0.0 &
[1] 139842
$ Forwarding from 0.0.0.0:3000 -> 3000


$ kubectl port-forward svc/keycloak 8080:8080 -n demo-ns --address=0.0.0.0 &
[2] 140302
$ Forwarding from 0.0.0.0:8080 -> 8080

$ kubectl get pvc -n demo-ns
NAME                    STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS   VOLUMEATTRIBUTESCLASS   AGE
grafana-lgtm-claim0     Bound    pvc-d322b455-cd84-4018-bf02-98dfc7b24646   100Mi      RWO            standard       <unset>                 80m
grafana-lgtm-claim2     Bound    pvc-41fbf65c-a76e-4890-b9ab-b8e336d72f58   100Mi      RWO            standard       <unset>                 80m
grafana-lgtm-claim3     Bound    pvc-1f7706db-ee5f-471c-acac-72a4bb267968   100Mi      RWO            standard       <unset>                 80m
keycloak-claim0         Bound    pvc-65bdc139-bf8a-467f-9c21-0cac63057f52   100Mi      RWO            standard       <unset>                 74m
keycloak-mysql-claim0   Bound    pvc-14fa8f97-d4c5-4e4d-81d8-f2f2bd65b49e   100Mi      RWO            standard       <unset>                 74m
postgres-order-claim0   Bound    pvc-2147c73a-0a18-491a-a181-e6d5d4534cbb   100Mi      RWO            standard       <unset>                 63m









